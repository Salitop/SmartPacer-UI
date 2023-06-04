import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../Service";

function HomeAluno() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [nome, setNome] = useState();

  const logout = async () => {
    navigate("/login");
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setNome(localStorage.getItem("nome"));
  }, []);

  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">
            Smart Pacer - Bem vindo Aluno(a) {nome}
          </Typography>
          <Button onClick={() => logout()}>Sair</Button>
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/cadastrarPacer")}
                >
                  Cadastrar nota Pacer
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/alterarsenha")}
                >
                  Alterar Senha
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

export default HomeAluno;
