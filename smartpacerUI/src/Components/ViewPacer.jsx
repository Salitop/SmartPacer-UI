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


  React.useEffect(() => {
    setStatusEquipe(false);
    setStatusSprint(false);
    Axios.get(`http://127.0.0.1:5000/obterTodasEquipes`).then((response) => setValues(response.data))
    
  }, []);

  carregarEquipes()
  

  function carregarEquipes()
  { 
    if(equipes.length < values?.length){
      for (let i = 0; i < values?.length; i++) {
        equipes.push({value: values[i].idequipe, label: values[i].equipe})
      }
    }
  }

  function eventoVoltar() {
      navigate("/login");
  };

  function getSprints() {
    Axios.get('http://127.0.0.1:5000/obterSprintSemestreAno', { params: {"semestre": semestre, "ano": ano}}).then((response) => {setSprints(response.data)});
    if(sprintsList.length <= 0){
      for (let i = 0; i < sprints?.length; i++) {
        sprintsList.push({value: sprints[i].idsprint, label: sprints[i].descricao})
      }
      if(sprintsList.length <= 0)
        setStatusSprint(false);
      else
        setStatusSprint(true);
    }
};

//Fazer salvar os Ids Selecionados e liberar o DDL da Equipe
  function selecionarSprint(e){
    console.log(e);
    setIdSprint(e);
    setStatusEquipe(true);
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
                  <Button variant="contained" sx={{width: 150, justifySelf: "left"}} onClick={getSprints}>
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
                    onChange={event => selecionarSprint(event.target.value)}  
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
                    onChange={event => setIdEquipe(event.target.value)}  
                    />
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
