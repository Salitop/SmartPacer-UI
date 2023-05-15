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
  const [values, setValues] = useState();
  const [sprints, setSprints] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [semestre, setSemestre] = useState();
  const [ano, setAno] = useState();
  const [sprintsList, setSprintsList] = useState([]);

  // obtem o semestre e ano atual
  const fetchData = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // adiciona 1 pois os meses são indexados a partir de 0
    var semestreAtual;

    if (currentMonth >= 1 && currentMonth <= 6) {
      setSemestre(1);
    } else {
      setSemestre(2);
    }

    setAno(currentYear);
  };

  //busca no banco todas as equipes
  const fetchDataEquipe = async () => {
    Axios.get(`http://127.0.0.1:5000/obterTodasEquipes`).then((response) =>
      setValues(response.data)
    );
  };

  // busca as sprints
  const fetchDataSprint = async () => {
    Axios.get("http://127.0.0.1:5000/obterSprintSemestreAno", {
      params: { semestre: semestre, ano: ano },
    }).then((response) => {
      setSprints(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // buscar Equipes
  useEffect(() => {
    fetchDataEquipe();
  }, []);

  // buscar sprints
  useEffect(() => {
    fetchDataSprint();
  }, []);

  // carregar Equipes
  useEffect(() => {
    if (equipes.length <= 0)
      for (let i = 0; i < values?.length; i++) {
        equipes.push({ value: values[i].idequipe, label: values[i].equipe });
      }
  }, [values]);

  // carregar Sprints
  useEffect(() => {
    for (let i = 0; i < sprints?.length; i++) {
      sprintsList.push({
        value: sprints[i].idsprint,
        label: sprints[i].descricao,
      });
    }
  }, [sprints]);

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
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{ marginTop: 10 }}>
          <Typography variant="h3">Gestão Sprint</Typography>
          <Button onClick={handleVoltarParaHome}>Voltar</Button>
          <Paper elelvation={2} sx={{ padding: 5, width: 500 }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container direction="column" spacing={4}>
                  <Grid item sx={{ alignSelf: "center", width: 500 }}>
                    <Select
                      value={sprint}
                      onChange={handleChangeSprint}
                      fullWidth
                      name="Sprint"
                      options={sprintsList}
                    />
                  </Grid>
                  <Grid item sx={{ alignSelf: "center", width: 500 }}>
                    <Select
                      value={equipe}
                      onChange={handleChangeEquipe}
                      fullWidth
                      name="Equipe"
                      options={equipes}
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
                      onChange={handleChangeNotaPacer}
                      value={notaPacer}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleCadastrarNotaPacer}
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
