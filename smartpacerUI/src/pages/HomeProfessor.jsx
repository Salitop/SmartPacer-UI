import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomeProfessor() {
  const navigate = useNavigate();

  const logout = async () => {
    navigate("/login");
  };

  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">
            Smart Pacer - Bem vindo Professor
          </Typography>
          <Button onClick={() => logout()}>Sair</Button>
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/viewPacer")}
                >
                  Visualizar Pacer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/gestaoSprint")}
                >
                  Gestão Sprint
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/viewAlunos")}
                >
                  Visualizar Alunos
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeProfessor;
