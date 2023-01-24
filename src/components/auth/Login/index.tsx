import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./_loginMain.module.scss";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss, Toastcontainer } from "../../shared/toastConfig";
import Card from "../../shared/ui/Card/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import useHttp from "../../hooks/useHttp";
import { authAction } from "../../../redux/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import Buttons from "../../shared/ui/Button/Buttons";
import LoginFormValidation from "../../../validation/LoginFormValidation";

const Login = () => {
  const [loginApiResponse, loginError, loginLoading, loginHookHandler] =
    useHttp({
      url: "http://localhost:5000/login",
      method: "post",
    });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormValidation)
  });

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field: any, a) => {
      return !!errors[field] ? field : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
    toast.info(errors[firstError]?.message, toastCss);
  }, [errors, setFocus]);

  const onSubmit = (req: any) => {
    loginHookHandler(req);
  };

  const handleApiResponse = () => {
    if (loginApiResponse.statusCode === 200) {
      localStorage.setItem("isAuth", "true");
      dispatch(
        authAction.setAccessToken({ value: loginApiResponse.data.access_token })
      );
      dispatch(authAction.login());
      navigate("/");
    } else if (loginError.statusCode) toast.info(loginError.message, toastCss);
  };

  useEffect(() => {
    handleApiResponse();
  }, [loginApiResponse, loginError]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Toastcontainer />
      <Box className="screen">
        <Box className="desc">
          <Box className={classes.container}>
                      
            <Card className={classes.card}>
              <Box sx={{ marginTop: "6%" }}>
                SIGN IN
              </Box>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.forms}
                >
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      type="text"
                      data-testid="email"
                      variant="outlined"
                      label="email"
                      {...register("email")}
                      fullWidth
                    />
                  </Box>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      fullWidth
                      data-testid="password"
                      label="Password"
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Stack>
                {!loginLoading && (
                  <Buttons
                    type="submit"
                    style={{
                      padding: "0px",
                      margin: "30px auto",
                      display: "block",
                      borderRadius: "30px",
                      backgroundColor: " #004A98 ",
                      color: "#ffffff",
                    }}
                  >
                    Sign In
                  </Buttons>
                )}
                {loginLoading && (
                  <CircularProgress sx={{ margin: "auto", display: "block" }} />
                )}
              </form>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
