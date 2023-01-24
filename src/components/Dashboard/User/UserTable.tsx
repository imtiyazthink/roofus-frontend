import { Box, CircularProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ListingTable, { HeadCell } from "../../shared/ListingTable";
import CreateUserModal from "./CreateUserModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
    value: "name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
    value: "email",
  },
  {
    id: "isEnrolled",
    numeric: false,
    label: "Status",
    value: "isEnrolled",
  },
];

const tableActionOptions = [
  {
    id: "edit",
    name: "Edit",
    href: "/edit",
  },
  {
    id: "delete",
    name: "Delete",
    href: "/delete",
  },
];

const initialData = {
  name:"",
  email: ""
};

const UserTable = () => {
  const [pageNo, setPageNo] = useState(0);
  const [filterRowsData, setFilterRowsData] = useState<any>([initialData]);
  const userEvent = useSelector((state: any) => state.event.userUpdateEvent);

  const [userApiResponse, userError, userLoading, userHookHandler] = useHttp({
    url: "http://localhost:5000/app/tenant",
    method: "get",
  });

  useEffect(() => {
    userHookHandler(null);
  }, [userEvent, pageNo]);

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
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap="2rem"
      >
        <CreateUserModal action="Create" text="Add Tenant" />
      </Stack>

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
            navigation="tenant"
            rowCellStyle={{ padding: "8px" }}
            tableActionOptions={tableActionOptions}
            setPageNo={setPageNo}
            pageNo={pageNo}
            totalCount={userApiResponse.paging?.totalCount}
          />
        </Box>
      )}
    </>
  );
};

export default UserTable;
