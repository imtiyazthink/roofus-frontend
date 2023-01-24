import Sidebar from "./Sidebar/Sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { QuestionAnswer } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar
        head={[
          { icon: <PeopleIcon sx={{ color: "white" }} />, text: "Tenant" },
          {
            icon: <AccountCircleIcon sx={{ color: "white" }} />,
            text: "Property",
          },
          {
            icon: <QuestionAnswer sx={{ color: "white" }} />,
            text: "Open-House",
          },
          {
            icon: <QuestionAnswer sx={{ color: "white" }} />,
            text: "Enroll",
          }
        ]}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "80%",
          bgcolor: "background.default",
          height: "95.8vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
