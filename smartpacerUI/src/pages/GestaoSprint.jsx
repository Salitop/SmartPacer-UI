import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
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
  const [semestre, setSemestre] = useState(0);
  const [ano, setAno] = useState(0);
  const [idSprint, setIdSprint] = useState(0);
  const [idEquipe, setIdEquipe] = useState(0);
  const [nota, setNota] = useState(0);
  const [sprints, setSprints] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [equipesList, setEquipesList] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);

  const handleVoltarParaHome = () => {
    navigate("/home-prof");
  };

  function handleFetchDataSprint() {
    obterTodasAsEquipes();
    obterTodasAsSprints();
  }

  const fetchCadastrarNotapacer = async () => {
    await Axios.post(`http://127.0.0.1:5000/cadastrarNotaSprint`, {
      idEquipe,
      idSprint,
      nota,
    }).then((response) => {
      console.log(response);
    });
    console.log(
      "Sprint: " + idSprint + " Equipe: " + idEquipe + " Nota: " + nota
    );
  };

  function handleFetchCadastrarNotaPacer() {
    fetchCadastrarNotapacer();
  }

  // obter todas as equipes no banco de dados
  const obterTodasAsEquipes = async () => {
    Axios.get(`http://127.0.0.1:5000/obterTodasEquipes`).then((response) =>
      setEquipesList(response.data)
    );
    console.log(equipesList[0]);
    if (equipes.length <= 0) {
      for (let i = 0; i < equipesList?.length; i++) {
        equipes.push({
          value: equipesList[i].idequipe,
          label: equipesList[i].equipe,
        });
      }
    } else {
      console.log(equipes);
    }
  };

  // obter todas as sprints
  const obterTodasAsSprints = async () => {
    Axios.get("http://127.0.0.1:5000/obterSprintSemestreAno", {
      params: { semestre: semestre, ano: ano },
    }).then((response) => {
      setSprintsList(response.data);
    });
    console.log(sprintsList[0]);
    if (sprints.length <= 0) {
      for (let i = 0; i < sprintsList?.length; i++) {
        sprints.push({
          value: sprintsList[i].idsprint,
          label: sprintsList[i].descricao,
        });
      }
    } else {
      console.log(sprints);
    }
  };

  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">Gestão Sprint</Typography>

          <Button onClick={handleVoltarParaHome}>Voltar</Button>
          <Paper elelvation={2} sx={{ padding: 5, width: 500 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid
                  item
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                  }}
                >
                  <TextField
                    type="text"
                    label="Semestre"
                    variant="outlined"
                    sx={{ width: 150, justifySelf: "right" }}
                    required
                    onChange={(e) => setSemestre(e.target.value)}
                  />
                  <TextField
                    type={"text"}
                    label="Ano"
                    variant="outlined"
                    sx={{ width: 150, justifySelf: "center" }}
                    required
                    onChange={(e) => setAno(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: 150, justifySelf: "left" }}
                    onClick={handleFetchDataSprint}
                  >
                    Pesquisar
                  </Button>
                </Grid>

                <Grid container direction="column" spacing={4} marginTop={2}>
                  <Grid item sx={{ alignSelf: "center", width: 500 }}>
                    <InputLabel id="sprint-select-label">Sprint</InputLabel>
                    <Select
                      labelId="sprint-select-label"
                      placeholder="Sprint"
                      select
                      fullWidth
                      onChange={(e) => setIdSprint(e.target.value)}
                      value={idSprint}
                      defaultValue={1}
                    >
                      {sprints.map((sprint) => (
                        <MenuItem key={sprint.id} value={sprint.value}>
                          {sprint.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item sx={{ alignSelf: "center", width: 500 }}>
                    <InputLabel id="equipe-select-label">Equipe</InputLabel>
                    <Select
                      labelId="equipe-select-label"
                      select
                      fullWidth
                      placeholder="Equipe"
                      onChange={(e) => setIdEquipe(e.target.value)}
                      value={idEquipe}
                      defaultValue={1}
                    >
                      {equipes.map((equipe) => (
                        <MenuItem key={equipe.id} value={equipe.value}>
                          {equipe.label}
                        </MenuItem>
                      ))}
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
                      onChange={(e) => setNota(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleFetchCadastrarNotaPacer}
                    >
                      Cadastrar nota pacer
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default GestaoSprint;
