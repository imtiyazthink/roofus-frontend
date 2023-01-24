import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import classes from "./_propertyDetail.module.scss";
import style from "../../../styles/_style.module.scss";
import useHttp from "../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastCss } from "../../shared/toastConfig";
import { useEffect } from "react";

const PropertyDetail = () => {
  const params = useParams();

  const [propertyGetResponse, propertyGetError, propertyGetLoading, propertyGetHookHandler] =
    useHttp({
      url: `http://localhost:5000/app/property-open-house/${params.id}`,
      method: "get",
    });

  useEffect(() => {
    propertyGetHookHandler(null);
  }, []);

  useEffect(() => {
    handleApiResponse();
  }, [propertyGetError]);

  const handleApiResponse = () => {
    if (propertyGetError.statusCode) toast.info(propertyGetError.message, toastCss);
  };

  return (
    
      <Box className={classes.container}>
      {propertyGetLoading ? (
        <CircularProgress
          size={80}
          sx={{
            position: "absolute",
            top: "46%",
            left: "56%",
          }}
        />
      ) : (
        propertyGetResponse.data.length > 0 ? propertyGetResponse.data.map((item: any, index: number) => (
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
            <Typography variant="h5" sx={{ color: style.primaryColor }}>
              Open House {index + 1}
            </Typography>
            <Stack
              justifyContent="space-around"
              sx={{ height: "100%", margin: "1rem" }}
            >
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Name</Typography>
                <Typography>
                  <b>{item.property.name}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Visitor Amount</Typography>
                <Typography>
                  <b>{item.visitorAmount}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Address</Typography>
                <Typography>
                  <b>{item.property.address}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Current Count</Typography>
                <Typography>
                  <b>{item.currentCount}</b>
                </Typography>
              </Box>
              <Box className={classes.field}>
                <Typography sx={{ width: "50%" }}>Start Date</Typography>
                <Typography>
                  <b>{item.startDate}</b>
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </>
        )) : <Typography
        sx={{ marginTop: "1rem" }}
        color={`${style.primaryColor}`}
        variant="h4"
      >
        No Open House Found
      </Typography>
      )}
    </Box>    
  );
};

export default PropertyDetail;
