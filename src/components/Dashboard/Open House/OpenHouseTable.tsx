import { Box, CircularProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ListingTable, { HeadCell } from "../../shared/ListingTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";
import CreateOpenHouseModal from "./CreateOpenHouseModal";

const headCells: HeadCell[] = [
  {
    id: "startDate",
    numeric: false,
    label: "Start Date",
    value: "startDate",
  },
  {
    id: "visitorAmount",
    numeric: false,
    label: "Visitor Amount",
    value: "visitorAmount",
  },
  {
    id: "currentCount",
    numeric: false,
    label: "Current Count",
    value: "currentCount",
  },
  {
    id: "propertyId",
    numeric: false,
    label: "Property",
    value: "property.name",
  }
];

const tableActionOptions = [
  {
    id: "edit",
    name: "Edit",
    href: "/edit",
  }
];

const initialData = {
  property: {
    name: ""
  },
  visitorAmount: "",
  startDate: ""
};

const OpenHouseTable = () => {
  const [filterRowsData, setFilterRowsData] = useState<any>([initialData]);
  const userEvent = useSelector((state: any) => state.event.userUpdateEvent);

  const [userApiResponse, userError, userLoading, userHookHandler] = useHttp({
    url: "http://localhost:5000/app/open-house",
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
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap="2rem"
      >
        <CreateOpenHouseModal action="Create" text="Add Open House" />
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
            navigation="open-house"
            rowCellStyle={{ padding: "8px" }}
            tableActionOptions={tableActionOptions}
          />
        </Box>
      )}
    </>
  );
};

export default OpenHouseTable;
