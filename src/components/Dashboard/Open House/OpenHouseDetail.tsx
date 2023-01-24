import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import classes from "./_openHouseDetail.module.scss";
import useHttp from "../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import { useEffect } from "react";
import CreateEnrollModal from "../EnrollHouse/CreateEnrollModal";

const OpenHouseDetail = () => {
  const params = useParams();

  const [openHouseGetResponse, openHouseGetError, openHouseGetLoading, openHouseGetHookHandler] =
    useHttp({
      url: `http://localhost:5000/app/open-house/${params.id}`,
      method: "get",
    });
    
  useEffect(() => {
    openHouseGetHookHandler(null);
  }, []);

  useEffect(() => {
    handleApiResponse();
  }, [openHouseGetError]);

  const handleApiResponse = () => {
    if (openHouseGetError.statusCode) toast.info(openHouseGetError.message, toastCss);
  };

  return (
    <Box className={classes.container}>
      {openHouseGetLoading ? (
        <CircularProgress
          size={80}
          sx={{
            position: "absolute",
            top: "46%",
            left: "56%",
          }}
        />
      ) : (
        <>
          <Stack
            className={classes.desc}
            sx={{
              boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "20px",
              borderRadius: "15px",
              minHeight: "500px",
              height: "50%",
              maxWidth: "100%",
            }}
          >
            
            <CreateEnrollModal action="Edit" text="Enroll" id={`${params.id}`} />
            <Stack
              justifyContent="space-around"
              sx={{ height: "100%", margin: "1rem" }}
            >
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Property</Typography>
                <Typography>
                  <b>{openHouseGetResponse.data.property && openHouseGetResponse.data.property.name}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Visitor Amount</Typography>
                <Typography>
                  <b>{openHouseGetResponse.data.visitorAmount}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Current Count</Typography>
                <Typography>
                  <b>{openHouseGetResponse.data.currentCount}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Start Date</Typography>
                <Typography>
                  <b>{openHouseGetResponse.data.startDate}</b>
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default OpenHouseDetail;
