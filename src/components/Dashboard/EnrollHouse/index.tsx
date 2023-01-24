import { Box, Breadcrumbs, Typography } from "@mui/material";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Toastcontainer } from "../../shared/toastConfig";
import style from "../../../styles/_style.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const EnrollHouse = () => {
  const params = useParams();

  return (
    <>
      <Toastcontainer />
      <Box sx={{ height: "96%", margin: "1rem" }}>
        <Typography
          sx={{ marginTop: "1rem" }}
          color={`${style.primaryColor}`}
          variant="h4"
        >
          EnrollHouse
        </Typography>
        <Outlet />
      </Box>
    </>
  );
};

export default EnrollHouse;
