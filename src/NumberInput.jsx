import React from "react";
import { TextField, InputAdornment } from "@mui/material";

export default ({ value, onChange, endIcon, label, ...rest }) => {
  return (
    <TextField
      size="small"
      margin="dense"
      variant="filled"
      fullWidth
      label={label}
      hiddenLabel={!label}
      inputProps={{
        pattern: "([^0-9]*)",
      }}
      InputProps={{
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined
      }}
      type="text"
      value={isNaN(value) ? '' : value}
      onChange={onChange}
      {...rest}
    />
  );
};
