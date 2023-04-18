import {
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function GestaoSprint() {
  const navigate = useNavigate();
  const [equipe, setEquipe] = useState();
  const [sprint, setSprint] = useState();
  const [notaPacer, setNotaPacer] = useState(0);

  const handleChangeSprint = (event) => {
    setSprint(event.target.value);
  };

  const handleChangeEquipe = (event) => {
    setEquipe(event.target.value);
  };

  const handleChangeNotaPacer = (event) => {
    setNotaPacer(event.target.value);
  };

  const handleCadastrarNotaPacer = () => {
    console.log(equipe, sprint, notaPacer);
  };

  const handleVoltarParaHome = () => {
    navigate("/home-prof");
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elelvation={2} sx={{ padding: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{ paddingBottom: 5 }}
            >
              Gestão de Sprints
            </Typography>
            <form>
              <Grid container direction="column" spacing={4}>
                <Grid item sx={{ alignSelf: "center", width: 500 }}>
                  <Select
                    value={sprint}
                    onChange={handleChangeSprint}
                    fullWidth
                    name="Sprint"
                  >
                    <MenuItem value={1}>Sprint 1</MenuItem>
                    <MenuItem value={2}>Sprint 2</MenuItem>
                  </Select>
                </Grid>
                <Grid item sx={{ alignSelf: "center", width: 500 }}>
                  <Select
                    value={equipe}
                    onChange={handleChangeEquipe}
                    fullWidth
                    name="Equipe"
                  >
                    <MenuItem value={1}>Equipe 1</MenuItem>
                    <MenuItem value={2}>Equipe 2</MenuItem>
                  </Select>
                </Grid>
                <Grid
                  item
                  sx={{
                    alignSelf: "center",
                    width: 500,
                  }}
                >
                  <TextField
                    type="number"
                    label="Nota Pacer"
                    onChange={handleChangeNotaPacer}
                    value={notaPacer}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleCadastrarNotaPacer}
                  >
                    Cadastrar Nota Pacer
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleVoltarParaHome}>
                    Voltar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default GestaoSprint;
