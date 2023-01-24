import { AppBar, Toolbar } from "@mui/material";
import style from "../../../styles/_style.module.scss";

const navbarStyle = {
  width: "calc(100% - 18%)",
  minWidth: "200px",
  ml: "18%",
  backgroundColor: "white",
  border: "1px solid #fff",
  background: "#ffffff 0% 0% no-repeat padding-box",
  boxShadow: `2px 3px 2px ${style.boxShadowColor}`,
  opacity: 1,
};

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={navbarStyle}>
      <Toolbar></Toolbar>
    </AppBar>
  );
};

export default Navbar;
