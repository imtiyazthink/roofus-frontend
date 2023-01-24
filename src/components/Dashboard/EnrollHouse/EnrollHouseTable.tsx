import { Box, CircularProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ListingTable, { HeadCell } from "../../shared/ListingTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";

const headCells: HeadCell[] = [
  {
    id: "tenant.name",
    numeric: false,
    label: "Tenant",
    value: "tenant.name",
  },
  {
    id: "tenant.email",
    numeric: false,
    label: "Email",
    value: "tenant.email",
  },
];

const tableActionOptions = [
  {
    id: "create",
    name: "Create",
    href: "/create",
  }
];

const initialData = {
  openHouse: {
    name: ""
  },
  tenant: {
    name: ""
  },
};

const EnrollHouseTable = () => {
  const [filterRowsData, setFilterRowsData] = useState<any>([initialData]);
  const userEvent = useSelector((state: any) => state.event.userUpdateEvent);

  const [userApiResponse, userError, userLoading, userHookHandler] = useHttp({
    url: "http://localhost:5000/app/enroll",
    method: "get",
  });

  useEffect(() => {
    userHookHandler(null);
  }, [userEvent]);

  const handleApiResponse = () => {
    if (userApiResponse.statusCode === 200) {
      setFilterRowsData(userApiResponse.data);
    }
    if (userError.statusCode) toast.info(userError.message, toastCss);
  };

  useEffect(() => {
    handleApiResponse();
  }, [userApiResponse, userError]);

  return (
    <>
      {userLoading ? (
        <CircularProgress
          size={80}
          sx={{
            position: "absolute",
            top: "46%",
            left: "56%",
          }}
        />
      ) : (
        <Box sx={{ marginTop: "3rem" }}>
          <ListingTable
            headCells={headCells}
            dataRows={filterRowsData}
            navigation="enroll"
            rowCellStyle={{ padding: "8px" }}
            tableActionOptions={tableActionOptions}
          />
        </Box>
      )}
    </>
  );
};

export default EnrollHouseTable;
