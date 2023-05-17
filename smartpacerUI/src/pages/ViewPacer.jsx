import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import React, { useState } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

function ViewPacer() {
  const navigate = useNavigate();
  const [values, setValues] = useState();
  const [sprints, setSprints] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [semestre, setSemestre] = useState();
  const [ano, setAno] = useState();
  const [idEquipe, setIdEquipe] = useState();
  const [idSprint, setIdSprint] = useState();
  const [sprintsList, setSprintsList] = useState([]);
  const [statusEquipe, setStatusEquipe] = useState(Boolean)
  const [statusSprint, setStatusSprint] = useState(Boolean)
  const [notasPacer, setNotasPacer] = useState([]);
  const [fetchSprint, setFetchSprint] = useState();

  const fetchDataEquipe = async () => {
    setStatusEquipe(false);
    setStatusSprint(false);
    Axios.get(`http://127.0.0.1:5000/obterTodasEquipes`).then((response) => setValues(response.data))
  }

  const fetchDataSprint = async () => {
    Axios.get('http://127.0.0.1:5000/obterSprintSemestreAno', { params: {"semestre": semestre, "ano": ano}}).then((response) => {setSprints(response.data)});
  }

  const fetchDataNotas = async () => {
    Axios.get('http://127.0.0.1:5000/visualizarNotasEquipeSprint', { params: {"idequipe": idEquipe, "idsprint": idSprint}}).then((response) => {setNotasPacer(response.data)});
  }

  // buscar Equipes
  React.useEffect(() => {
    fetchDataEquipe();
  }, []);

  // buscar Notas
  React.useEffect(() => {
    if (idEquipe && idSprint)
      fetchDataNotas();
  }, [idEquipe, idSprint]);

  // carregarEquipes
  React.useEffect(() => {
    if(equipes.length <= 0)
    for (let i = 0; i < values?.length; i++) {
      equipes.push({value: values[i].idequipe, label: values[i].equipe})
    }   
  }, [values]);

  // carregar Sprints
  React.useEffect(() => {
    if(sprintsList.length <= 0){
    for (let i = 0; i < sprints?.length; i++) {
      sprintsList.push({value: sprints[i].idsprint, label: sprints[i].descricao})
    }
    if(sprintsList.length <= 0){
      setStatusSprint(false);
    }
    else
      setStatusSprint(true);
    }

  }, [sprints]);

function handleFetchDataSprint() {
  fetchDataSprint();
}

const handleChange = (event) => {
  setIdSprint(event.value);
  setStatusEquipe(true);
  } 

const carregarGrid = (event) => {
  setIdEquipe(event.value);
}

function eventoVoltar(){
  navigate("/home")
}


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
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ paddingBottom: 5 }}>
              Visualizar Pacer
            </Typography>
            <form>
              <Grid container direction="column" spacing={4}>
                <Grid item sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                  <TextField
                    type="text"                 
                    label="Semestre"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "right"}}
                    required
                    onChange={event => setSemestre(event.target.value)}
                  />
                  <TextField
                    type={"text"}
                    label="Ano"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "center"}}
                    required
                    onChange={event => setAno(event.target.value)}
                  />
                  <Button variant="contained" sx={{width: 150, justifySelf: "left"}} onClick={handleFetchDataSprint}>
                    Pesquisar
                  </Button>
                </Grid>
                <Grid item sx={{alignSelf:"center", width: 500}}>
                    <Select
                    isDisabled = {!statusSprint}
                    label="Sprint"
                    variant="outlined"
                    placeholder="Sprint"
                    required
                    options={sprintsList}
                    onChange={handleChange}  
                    />
                </Grid>
                <Grid item sx={{alignSelf:"center", width: 500}}>
                    <Select
                    isDisabled = {!statusEquipe}
                    label="Equipe"
                    variant="outlined"
                    placeholder="Equipe"
                    required
                    options={equipes}
                    onChange={carregarGrid}  
                    />
                </Grid>
                <Grid sx={{alignSelf: "center", paddingTop: 8}}>
                <TableContainer component={Paper}>
      <Table sx={{ width: 450 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Média P</TableCell>
            <TableCell>Média A</TableCell>
            <TableCell>Média C</TableCell>
            <TableCell>Média ER</TableCell>
            <TableCell>Média total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* trocar rows por notasPacer */}
          {notasPacer.map((row) => (
            <TableRow
              key={row.nomeAluno}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell> {row.nomealuno} </TableCell>
              <TableCell> {row.mediap} </TableCell>
              <TableCell> {row.mediaa} </TableCell>
              <TableCell> {row.mediac} </TableCell>
              <TableCell> {row.mediaer} </TableCell>
              <TableCell> {row.mediapacer} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </Grid>
                <Grid item sx={{alignSelf:"center"}}>
                  <Button variant="contained" onClick={eventoVoltar}>
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

export default ViewPacer;
