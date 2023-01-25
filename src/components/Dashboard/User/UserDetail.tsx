import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import classes from "./_userDetail.module.scss";
import style from "../../../styles/_style.module.scss";
import useHttp from "../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import { useEffect } from "react";

const UserDetail = () => {
  const userId = useParams();

  const [userGetResponse, userGetError, userGetLoading, userGetHookHandler] =
    useHttp({
      url: `http://localhost:5000/app/tenant/${userId.id}`,
      method: "get",
    });

  useEffect(() => {
    userGetHookHandler(null);
  }, []);

  useEffect(() => {
    handleApiResponse();
  }, [userGetError]);

  const handleApiResponse = () => {
    if (userGetError.statusCode) toast.info(userGetError.message, toastCss);
  };

  return (
    <Box className={classes.container}>
      {userGetLoading ? (
        <CircularProgress
          size={80}
          sx={{
            position: "absolute",
            top: "46%",
            left: "56%",
          }}
        />
      ) : (
        <>
          <Stack
            className={classes.desc}
            sx={{
              boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "20px",
              borderRadius: "15px",
              minHeight: "500px",
              height: "50%",
              maxWidth: "100%",
            }}
          >
            <Typography variant="h5" sx={{ color: style.primaryColor }}>
              Demographics
            </Typography>
            <Stack
              justifyContent="space-around"
              sx={{ height: "100%", margin: "1rem" }}
            >
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Name</Typography>
                <Typography>
                  <b>{userGetResponse.data.name}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Email</Typography>
                <Typography>
                  <b>{userGetResponse.data.email}</b>
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default UserDetail;
