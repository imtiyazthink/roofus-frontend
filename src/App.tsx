import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/Dashboard/User";
import UserDetail from "./components/Dashboard/User/UserDetail";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import "./styles/_common.scss";
import UserTable from "./components/Dashboard/User/UserTable";
import { useSelector } from "react-redux";
import Property from "./components/Dashboard/Property";
import PropertyTable from "./components/Dashboard/Property/PropertyTable";
import PropertyDetail from "./components/Dashboard/Property/PropertyDetail";
import OpenHouse from "./components/Dashboard/Open House";
import OpenHouseTable from "./components/Dashboard/Open House/OpenHouseTable";
import OpenHouseDetail from "./components/Dashboard/Open House/OpenHouseDetail";
import EnrollHouse from "./components/Dashboard/EnrollHouse";
import EnrollHouseTable from "./components/Dashboard/EnrollHouse/EnrollHouseTable";

const App = () => {
  const isAuth = useSelector((state: any) => state.auth.isLogin);
  return (
    <Router>
      <Routes>
        {!isAuth && <Route path="/login" element={<Login />} />}
        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route path="/tenant" element={<User />}>
              <Route index element={<UserTable />} />
              <Route path="/tenant/:id" element={<UserDetail />} />
            </Route>
            <Route path="/property" element={<Property />}>
              <Route index element={<PropertyTable />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
            </Route>
            <Route path="/open-house" element={<OpenHouse />}>
              <Route index element={<OpenHouseTable />} />
              <Route path="/open-house/:id" element={<OpenHouseDetail />} />
            </Route>
            <Route path="/enroll" element={<EnrollHouse />}>
              <Route index element={<EnrollHouseTable />} />
            </Route>
          </Route>
        </Route>
       
        <Route path="*" element={<Navigate to="/tenant" />} />
      </Routes>
    </Router>
  );
};

export default App;
