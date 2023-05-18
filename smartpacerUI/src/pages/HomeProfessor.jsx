import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomeProfessor() {
  const navigate = useNavigate();

  const logout = async () => {
    // await Service.post("//localhost:5000/logout");
    navigate("/login");
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const resp = await Service.get("//localhost:5000/@me");
  //       setId(resp.data.id);
  //       setNome(resp.data.nome);
  //     } catch (error) {
  //       console.log("Not authenticated");
  //     }
  //   })();
  // });
  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">
            Smart Pacer - Bem vindo Professor
          </Typography>
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
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => logout()}
                >
                  Sair
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
