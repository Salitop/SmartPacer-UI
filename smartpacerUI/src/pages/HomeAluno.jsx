import { Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar";

function HomeAluno() {
  return (
    <>
      <Navbar />
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3"> Smart Pacer - Bem vindo Aluno</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeAluno;
