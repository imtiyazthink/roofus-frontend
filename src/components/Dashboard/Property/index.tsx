import { Box, Breadcrumbs, Typography } from "@mui/material";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Toastcontainer } from "../../shared/toastConfig";
import style from "../../../styles/_style.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Property = () => {
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
              to="/property"
            >
              {params.id ? (
                <>
                  <AccountCircleIcon sx={{ marginRight: "5px" }} /> Back To Property
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
          Property
        </Typography>
        <Outlet />
      </Box>
    </>
  );
};

export default Property;
