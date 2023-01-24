import { Box } from "@mui/material";
import React from "react";
import classes from "./_card.module.scss";

const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <Box className={`${classes.card} ${className}`}>
      <>{children}</>
    </Box>
  );
};

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}

export default Card;
