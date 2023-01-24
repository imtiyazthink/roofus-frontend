import { Box, CircularProgress, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import ListingTable, { HeadCell } from "../../shared/ListingTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";
import CreatePropertyModal from "./CreatePropertyModal";

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
    value: "name",
  },
  {
    id: "owner.name",
    numeric: false,
    label: "Owner",
    value: "owner.name",
  },
  {
    id: "address",
    numeric: false,
    label: "Address",
    value: "address",
  },
];

const tableActionOptions = [
  {
    id: "edit",
    name: "Edit",
    href: "/edit",
  },
];

const initialData = {
  name: "",
  address: "",
  owner: {
    name: ""
  }
};

const PropertyTable = () => {
  const [filterRowsData, setFilterRowsData] = useState<any>([initialData]);
  const userEvent = useSelector((state: any) => state.event.userUpdateEvent);

  const [propertyApiResponse, propertyError, propertyLoading, propertyHookHandler] = useHttp({
    url: "http://localhost:5000/app/property",
    method: "get",
  });

  useEffect(() => {
    propertyHookHandler(null);
  }, [userEvent]);

  const handleApiResponse = () => {
    if (propertyApiResponse.statusCode === 200) {
      setFilterRowsData(propertyApiResponse.data);
    }
    if (propertyError.statusCode) toast.info(propertyError.message, toastCss);
  };

  useEffect(() => {
    handleApiResponse();
  }, [propertyApiResponse, propertyError]);

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap="2rem"
      >
        
        <CreatePropertyModal action="Create" text="Add Property" />
      </Stack>

      {propertyLoading ? (
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
            navigation="property"
            rowCellStyle={{ padding: "8px" }}
            tableActionOptions={tableActionOptions}
          />
        </Box>
      )}
    </>
  );
};

export default PropertyTable;
