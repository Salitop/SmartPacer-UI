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
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Visualizar Pacer
            </Typography>
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    label="semestre"
                    placeholder="Semestre"
                    variant="outlined"
                    required
                    onChange={(e) =>
                      setValues({ ...values, semestre: e.target.value })
                    }
                  />
                  <TextField
                    type={"text"}
                    fullWidth
                    label="ano"
                    placeholder="Ano"
                    variant="outlined"
                    required
                    onChange={(e) =>
                      setValues({ ...values, ano: e.target.value })
                    }
                  />
                </Grid>
                <Grid item>
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
                <Grid item>
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
                <Grid item>
                  <Button fullWidth variant="contained" onClick={eventoVoltar}>
                    Acessar
                  </Button>
                  <Button fullWidth variant="contained" onClick={eventoVoltar}>
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
