import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function ViewPacer() {
  const navigate = useNavigate();
  const [sprints, setSprints] = useState([]);
  const [sprintId, setSprintId] = useState();
  const [alunos, setAlunos] = useState([]);
  const [alunoAlvoId, setAlunoAlvoId] = useState();
  const [alunosList, setAlunosList] = useState([]);
  const [sprintsList, setSprintsList] = useState([]);
  const [notaP, setNotaP] = useState();
  const [notaA, setNotaA] = useState();
  const [notaC, setNotaC] = useState();
  const [notaER, setNotaER] = useState();
  const [pontosPacer, setPontosPacer] = useState();
  
  const alunoId = localStorage.getItem('idUsuario')

  const fetchData = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // adiciona 1 pois os meses são indexados a partir de 0
    var semestreAtual;

    if (currentMonth >= 1 && currentMonth <= 6) {
        semestreAtual = 1;
    } else {
        semestreAtual = 2;
    }

    const resultSprint = await Axios.get("http://127.0.0.1:5000/obterSprintSemestreAno", {
                                     params: { semestre: semestreAtual, ano: currentYear },
    });

    const resultAluno = await Axios.get("http://127.0.0.1:5000/obterUsuarioPorIdUsuario", {
                              params: { idusuario: alunoId }, /*variavel global para pegar o Id da Equipe no qual o aluno está*/
    });
    setAlunos(resultAluno.data);
    setSprints(resultSprint.data);
}

const fetchDataNotaPacer = async () => {
  setPontosPacer(0);
  const result = await Axios.get("http://127.0.0.1:5000/obterValorEquipeSprint", {
                                   params: { idequipe: alunos[0].idEquipe, idsprint: sprintId },
  });
  setPontosPacer(result.data.valorSprint);
}

React.useEffect(() => {
    fetchData();
  }, []);

React.useEffect(() => {
    if (alunos?.length >= 0 || sprints?.length >= 0) {
      if (alunosList.length <= 0) {
        const newAlunosList = alunos.map((aluno) => ({
          value: aluno.id,
          label: aluno.nome,
        }));
        setAlunosList(newAlunosList);
      }
      if (sprintsList.length <= 0) {
        const newSprintsList = sprints.map((sprint) => ({
          value: sprint.idsprint,
          label: sprint.descricao,
        }));
        setSprintsList(newSprintsList);
        console.log(sprintsList);
      }
    }
  }, [alunos, sprints]);

  React.useEffect(() => {
    fetchDataNotaPacer()
  }, [sprintId, alunoAlvoId]);

  function eventoCadastrar(){
    const dadosPacer ={
        notaP: notaP,
        notaA: notaA,
        notaC: notaC,
        notaER: notaER,
        usuario: alunoId,
        usuarioAvaliado: alunoAlvoId,
        idSprint: sprintId
    }

    console.log(dadosPacer);

    Axios.post('http://127.0.0.1:5000/cadastrarNotas', dadosPacer, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(()=> {alert(`Nota cadastrada`)})
  }

  function eventoVoltar() {
    navigate("/home-aluno");
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
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              sx={{ paddingBottom: 5 }}
            >
              Cadastrar Pacer
            </Typography>
            <form>
              <Grid container direction="column" spacing={4}>
                <Grid item sx={{ alignSelf: "center", width: 500 }}>
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
                  <Select
                    label="Aluno"
                    variant="outlined"
                    placeholder="Aluno"
                    required
                    options={alunosList}
                    onChange={event => setAlunoAlvoId(event.value)}
                  />
                </Grid>  
                <Grid item sx={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
                <TextField
                    type="text"                 
                    label="P"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "right"}}
                    required
                    onChange={event => setNotaP(event.target.value)}
                  />
                  <TextField
                    type={"text"}
                    label="A"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "center"}}
                    required
                    onChange={event => setNotaA(event.target.value)}
                  />
                  <TextField
                    type={"text"}
                    label="C"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "center"}}
                    required
                    onChange={event => setNotaC(event.target.value)}
                  />
                  <TextField
                    type={"text"}
                    label="ER"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "center"}}
                    required
                    onChange={event => setNotaER(event.target.value)}
                  />
                </Grid>
                <Grid item sx={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
                <Typography sx={{justifySelf: "right"}}>
                  Total de pontos: {pontosPacer}
                </Typography>
                {/* <Text sx={{justifySelf: "left"}}>
                  Pontos restantes: {totalPacerRestante}
                </Text> */}
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
                  <Button variant="contained" onClick={eventoCadastrar}>
                    Cadastrar
                  </Button>
                </Grid>

                <Grid item sx={{ alignSelf: "center" }}>
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
