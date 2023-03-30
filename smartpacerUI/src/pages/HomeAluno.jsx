import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../Service";

function HomeAluno() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [nome, setNome] = useState();

  const logout = async () => {
    await Service.post("//localhost:5000/logout");
    navigate("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await Service.get("//localhost:5000/@me");
        setId(resp.data.id);
        setNome(resp.data.nome);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  });

  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">Smart Pacer - Bem vindo Aluno</Typography>
          <Button onClick={() => logout()}>Sair</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeAluno;
