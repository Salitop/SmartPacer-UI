import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Axios from "axios";

function GestaoSprint() {
  const navigate = useNavigate();
  const [equipe, setEquipe] = useState([]);
  const [sprint, setSprint] = useState([]);
  const [notaPacer, setNotaPacer] = useState(0);
  const [values, setValues] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);
  const [idEquipe, setIdEquipe] = useState();
  const [sprintId, setSprintId] = useState();
  // obtem o semestre e ano atual
  React.useEffect(() => {

    fetchDataSprint();
    fetchDataEquipe();
  }, []);

  const fetchDataSprint = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // adiciona 1 pois os meses são indexados a partir de 0
    var semestreAtual;

    if (currentMonth >= 1 && currentMonth <= 6) {
        semestreAtual = 1;
    } else {
        semestreAtual = 2;
    }
    Axios.get('http://edryanmaciel.pythonanywhere.com/obterSprintSemestreAno', { params: {"semestre": semestreAtual, "ano": currentYear}}).then((response) => {setSprints(response.data)});
  }

  const fetchDataEquipe = async () => {
    Axios.get(`http://edryanmaciel.pythonanywhere.com/obterTodasEquipes`).then((response) => setValues(response.data))
  }

    // carregarEquipes
    React.useEffect(() => {
      if(equipes.length <= 0)
      for (let i = 0; i < values?.length; i++) {
        equipes.push({value: values[i].idequipe, label: values[i].equipe})
      }   
      console.log(equipes)
    }, [values]);

  // carregar Sprints
  React.useEffect(() => {
    if(sprintsList.length <= 0){
      for (let i = 0; i < sprints?.length; i++) {
        sprintsList.push({value: sprints[i].idsprint, label: sprints[i].descricao})
      }
      console.log(sprintsList)
    }
  }, [sprints]);

  const handleCadastrarNotaPacer = () => {
    console.log(equipe, sprint, notaPacer);
  };

  const handleVoltarParaHome = () => {
    navigate("/home-prof");
  };

  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ paddingBottom: 5 }}>Gestão Sprint</Typography>
          <Paper elelvation={2} sx={{ padding: 5, width: 500 }}>
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
                    label="Sprint"
                    variant="outlined"
                    placeholder="Sprint"
                    required
                    options={sprintsList}
                    onChange={event => setSprintId(event.value)}
                    />
                  </Grid>

                  <Grid item sx={{ alignSelf: "center", width: 500 }}>
                    <InputLabel id="equipe-select-label">Equipe</InputLabel>
                    <Select
                    label="Equipe"
                    variant="outlined"
                    placeholder="Equipe"
                    required
                    options={equipes}
                    onChange={event => setIdEquipe(event.value)}
                    />
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
                      onChange={event => setNotaPacer(event.value)}
                      value={notaPacer}
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
                  <Grid item>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleVoltarParaHome}
                    >
                      Voltar
                    </Button>
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
