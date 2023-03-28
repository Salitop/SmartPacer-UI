import { Grid, Typography } from "@mui/material";
import React from "react";

function HomeProfessor(props) {
  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">
            Smart Pacer - Bem vindo Professor
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeProfessor;
