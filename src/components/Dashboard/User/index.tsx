import { Box, Breadcrumbs, Typography } from "@mui/material";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Toastcontainer } from "../../shared/toastConfig";
import style from "../../../styles/_style.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const User = () => {
  const params = useParams();

  return (
    <>
      <Toastcontainer />
      <Box sx={{ height: "96%", margin: "1rem" }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink
              style={{
                color: `${style.primaryColor}`,
                display: "flex",
                textDecoration: "none",
              }}
              to="/tenant"
            >
              {params.id ? (
                <>
                  <AccountCircleIcon sx={{ marginRight: "5px" }} /> Back To Tenant
                </>
              ) : (
                ""
              )}
            </NavLink>
          </Breadcrumbs>
        </Box>

        <Typography
          sx={{ marginTop: "1rem" }}
          color={`${style.primaryColor}`}
          variant="h4"
        >
          Tenant
        </Typography>
        <Outlet />
      </Box>
    </>
  );
};

export default User;
