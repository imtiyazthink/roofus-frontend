import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import classes from "./_sidebar.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Typography } from "@mui/material";
import style from "../../../styles/_style.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../../redux/authSlice";

const Sidebar: React.FC<Props> = ({ head }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("isAuth");
    dispatch(authAction.logout());
    dispatch(authAction.removeAccessToken());
    dispatch(authAction.removeUserId());
    navigate("/login");
  };

  return (
    <Drawer
      sx={{
        width: "18%",
        minWidth: "250px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "18%",
          minWidth: "250px",
          boxSizing: "border-box",
          backgroundColor: "#dee1e75e",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box className={classes.sidebar}>
        <Box className={classes.bar}>
          <Box id={classes.bar_first}></Box>
          <Box id={classes.bar_second}></Box>
          <Box id={classes.bar_first}></Box>
          <Box id={classes.bar_second}></Box>
          <Box id={classes.bar_first}></Box>
        </Box>
        <Box sx={{ marginTop: "10%", height: "100%", width: "100%" }}>
          <Box className={classes.menu}>
            <List className={classes.main_menu}>
              {head.map((item, index) => (
                <NavLink
                  to={
                    item.text === "Health Coach"
                      ? "/health-coach"
                      : item.text === "Care Program"
                      ? "/care-program"
                      : item.text === "Home"
                      ? "/"
                      : `/${item.text.toLowerCase()}`
                  }
                  end
                  className={classes.menu_item}
                  key={index}
                  onClick={() => {
                    if (item.text === "Health Coach") navigate(`/health-coach`);
                    else navigate(`/${item.text.toLowerCase()}`);
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <Typography
                      sx={{
                        fontSize: style.fontSize,
                        fontStyle: style.fontStyle,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </ListItemButton>
                </NavLink>
              ))}
              <ListItemButton onClick={logoutHandler}>
                <ListItemIcon>
                  {<LogoutIcon sx={{ color: "white" }} />}
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Sign Out" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

interface Props {
  head: any[];
}

export default Sidebar;
