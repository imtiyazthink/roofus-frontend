import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Divider,
  Grid,
  MenuItem,
  TextField,
  CircularProgress,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useHttp from "../../hooks/useHttp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import classes from "../../../styles/_style.module.scss";
import { eventAction } from "../../../redux/eventSlice";
import { useDispatch } from "react-redux";
import PropertyFormValidation from "../../../validation/PropertyFormValidation";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: "54.375%",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "1px solid #707070",
  borderRadius: "20px",
  opacity: 1,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};


const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreatePropertyModal: React.FC<Props> = ({
  action,
  text,
  closeMenu = () => {},
  id,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
    closeMenu();
  };

  const dispatch = useDispatch();

  const [
    userPostResponse,
    userPostError,
    userPostLoading,
    userPostHookHandler,
  ] = useHttp({
    url: "http://localhost:5000/app/property",
    method: "post",
  });

  const [
    tenantPostResponse,
    tenantPostError,
    tenantPostLoading,
    tenantPostHookHandler,
  ] = useHttp({
    url: "http://localhost:5000/app/tenant",
    method: "get",
  });

  const [userGetResponse, userGetError, userGetLoading, userGetHookHandler] =
    useHttp({
      url: `http://localhost:5000/app/property/${id}`,
      method: "get",
    });

  const [
    userEditResponse,
    userEditError,
    userEditLoading,
    userEditHookHandler,
  ] = useHttp({
    url: `http://localhost:5000/app/property/${id}`,
    method: "put",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(PropertyFormValidation)
  });

  const onSubmit = (data: any) => {
    if (action === "Create") {
      userPostHookHandler(data);
    } else if (action === "Edit") {
      userEditHookHandler(data);
    }
  };

  const handleCreateApiResponse = () => {
    if (userPostResponse.statusCode === 201) {
      dispatch(eventAction.setUserUpdateEvent());
      toast.info(userPostResponse.message, toastCss);
      handleClose();
      reset();
    } else if (userPostError.statusCode)
      toast.info(userPostError.message, toastCss);
  };

  const handleEditApiResponse = () => {
    if (userEditResponse.statusCode === 200) {
      dispatch(eventAction.setUserUpdateEvent());
      toast.info(userEditResponse.message, toastCss);
      handleClose();
      reset();
    } else {
      if (userEditError.statusCode) {
        toast.info(userEditError.message, toastCss);
        handleClose();
        reset();
      }
    }
  };

  const handleGetApiErrorResponse = () => {
    if (userGetError.statusCode) toast.info(userGetError.message, toastCss);
  };

  useEffect(() => {
    handleCreateApiResponse();
  }, [userPostResponse, userPostError]);


  useEffect(() => {
    handleEditApiResponse();
  }, [userEditResponse, userEditError]);


  useEffect(() => {
    handleGetApiErrorResponse();
  }, [userGetError]);


  useEffect(() => {
    tenantPostHookHandler(null);
  }, [])

  useEffect(() => {
    if (action === "Edit") userGetHookHandler(null);
  }, []);

  return (
    <div>
      {action === "Create" && (
        <Button
          onClick={handleOpen}
          variant="contained"
          data-testid="addUser"
          sx={{
            height: "44px",
            borderRadius: "8px",
            backgroundColor: classes.primaryColor,
          }}
        >
          {text}
        </Button>
      )}
      {action === "Edit" && (
        <Button
        variant="contained"

          onClick={handleOpen}
          key={id}
          sx={{
            height: "100%",
          }}
        >
          {text}
        </Button>
      )}
      {(action === "Create" ||
        (action === "Edit")) && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`${action} Property`}
            </Typography>
            <Divider sx={{ marginTop: "10px" }} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography component={"span"} variant={"body2"}>
                        Name&nbsp;
                      </Typography>
                      <Typography
                        sx={{ color: classes.errorColor }}
                        component={"span"}
                        variant={"body1"}
                      >
                        *
                      </Typography>
                      <br />
                      <TextField
                        fullWidth
                        defaultValue={
                          action === "Edit"
                            ? userGetResponse.data.name
                            : ""
                        }
                        placeholder="Enter Name"
                        {...register("name")}
                        error={Boolean(errors?.name)}
                        helperText={errors.name?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                          <Typography sx={{ mt: 2 }} component={"span"}>
                            Owner&nbsp;
                          </Typography>
                          <Typography
                            sx={{ color: classes.errorColor }}
                            component={"span"}
                            variant={"body1"}
                          >
                            *
                          </Typography>
                          <FormControl fullWidth>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              {...register("owner")}
                              defaultValue={
                                action === "Edit"
                                  ? tenantPostResponse.data._id === null
                                    ? ""
                                    : tenantPostResponse.data._id
                                  : ""
                              }
                              MenuProps={MenuProps}
                              error={Boolean(errors?.owner)}
                            >
                              {tenantPostResponse.data.length > 0 && tenantPostResponse.data.map((option: any) => (
                                <MenuItem
                                  key={option._id}
                                  value={option._id}
                                >
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {Boolean(errors?.owner) && (
                            <FormHelperText>
                              <span style={{ color: "#d32f2f" }}>
                                {errors.owner?.message}
                              </span>
                            </FormHelperText>
                          )}
                        </Grid>

                   
                    <Grid item xs={12}>
                      <Typography component={"span"} variant={"body2"}>
                        Address&nbsp;
                      </Typography>
                      <Typography
                        sx={{ color: classes.errorColor }}
                        component={"span"}
                        variant={"body1"}
                      >
                        *
                      </Typography>
                      <br />
                      <TextField
                        fullWidth
                        placeholder="Enter Address"
                        defaultValue={
                          action === "Edit" ? userGetResponse.data.address : ""
                        }
                        {...register("address")}
                        error={Boolean(errors?.address)}
                        helperText={errors.address?.message}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "right",
                        columnGap: 3,
                      }}
                    >
                      <Button variant="outlined" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={userPostLoading || userEditLoading}
                        sx={{
                          backgroundColor: classes.primaryColor,
                          borderRadius: "4px",
                        }}
                      >
                        Save
                      </Button>
                      {(userPostLoading || userEditLoading) && (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: "absolute",
                            marginTop: "5px",
                            marginRight: "20px",
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </div>
              </form>
           
          </Box>
        </Modal>
      )}
    </div>
  );
};

interface Props {
  action: string;
  id?: number;
  text: string;
  closeMenu?: () => void;
}

export default CreatePropertyModal;
