import React from "react";
import { Button, SxProps } from "@mui/material";
import classes from "./_buttons.module.scss";
import { Theme } from "@mui/system";
import style from "../../../../styles/_style.module.scss";

const buttonStyle = {
  boxShadow: "0px 2px 8px #9FD1F1",
  border: " 1px solid #B7B7B7",
  color: "#B7B7B7",
  borderRadius: " 30px",
  font: `normal normal bold ${style.fontSize} ${style.fontStyle}`,
};

const Buttons: React.FC<Props> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
      type={props.type ? props.type : "button"}
      variant={props.variant ? "outlined" : "contained"}
      className={classes.button}
      sx={props.variant ? buttonStyle : props.style}
    >
      {props.children}
    </Button>
  );
};

interface Props {
  children: JSX.Element | JSX.Element[] | string;
  style?: SxProps<Theme>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
}

export default Buttons;
