import React from "react";

import { Grid, Typography } from "@mui/material";

function Base() {
  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">Smart Pacer - Bem vindo</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Base;