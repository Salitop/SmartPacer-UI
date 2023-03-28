import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    semestre: "",
    ano: "",
    IdEquipe: "",
    IdSprint: ""
  });

  const sprints = [{value: '1', label: 'Sprint1'},
                   {value: '2', label: 'Sprint2'},
                   {value: '3', label: 'Sprint3'},
                   {value: '4', label: 'Sprint4'},];

  const equipes = [{value: '1', label: 'Equipe1'},
                   {value: '2', label: 'Equipe2'},
                   {value: '3', label: 'Equipe3'},
                   {value: '4', label: 'Equipe4'},]

  function eventoVoltar() {
      navigate("/login");
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
                    onChange={(e) =>
                      setValues({ ...values, semestre: e.target.value })
                    }
                  />
                  <TextField
                    type={"text"}
                    label="Ano"
                    variant="outlined"
                    sx={{width: 150, justifySelf: "center"}}
                    required
                    onChange={(e) =>
                      setValues({ ...values, ano: e.target.value })
                    }
                  />
                  <Button variant="contained" sx={{width: 150, justifySelf: "left"}} onClick={eventoVoltar}>
                    Acessar
                  </Button>
                </Grid>
                <Grid item sx={{alignSelf:"center", width: 500}}>
                    <Select
                    label="Sprint"
                    variant="outlined"
                    placeholder="Sprint"
                    required
                    options={sprints}>
                    onChange={(e) =>
                      setValues({...values, IdSprint: e.target.value})}
                    </Select>
                </Grid>
                <Grid item sx={{alignSelf:"center", width: 500}}>
                    <Select
                    label="Equipe"
                    variant="outlined"
                    placeholder="Equipe"
                    required
                    options={equipes}>
                    onChange={(e) =>
                      setValues({...values, IdEquipe: e.target.value})}
                    </Select>
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

export default Login;
