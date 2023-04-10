import {
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../Service";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function HomeAluno() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [nome, setNome] = useState();
  const [id, setId] = useState();
  const [showForm, setShowForm] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState();
  const [senhaNova, setSenhaNova] = useState();
  const [senhaNovaConf, setSenhaNovaConf] = useState();

  const handlePassVisibilty = () => {
    setShowPass(!showPass);
  };

  const logout = async () => {
    await Service.post("//localhost:5000/logout");
    navigate("/login");
  };

  const handleChangePassword = () => {
    console.log(senhaAntiga, senhaNova, senhaNovaConf);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await Service.get("//localhost:5000/@me");
        setId(resp.data.id);
        setNome(resp.data.nome);
        console.log(nome, id);
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
          <Paper elevation={2} sx={{ padding: 5 }}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item width="80%">
                <Button fullWidth variant="contained">
                  Gestão Pacer
                </Button>
              </Grid>
              <Grid item width="80%">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleToggleForm()}
                >
                  Trocar Senha
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {/* Mostra o formulario para aletrar a senha */}
          <Grid
            item
            spacing={2}
            direction="column"
            justifyContent="center"
            display={showForm === true ? "flex" : "none"}
            marginTop={2}
          >
            <Paper elelvation={2} sx={{ padding: 5 }}>
              <Typography variant="body1" fontWeight="bold" textAlign="center">
                Alterar Senha
              </Typography>
              <form>
                <Grid item marginTop={2}>
                  <TextField
                    type={showPass ? "text" : "password"}
                    fullWidth
                    label="Senha antiga"
                    placeholder="Insira a senha antiga"
                    variant="outlined"
                    required
                    onChange={(e) => setSenhaAntiga(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password"
                            edge="end"
                            onClick={handlePassVisibilty}
                          >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item marginTop={2}>
                  <TextField
                    type={showPass ? "text" : "password"}
                    fullWidth
                    label="Nova senha"
                    placeholder="Insira a nova senha"
                    variant="outlined"
                    required
                    onChange={(e) => setSenhaNova(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password"
                            edge="end"
                            onClick={handlePassVisibilty}
                          >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item marginTop={2}>
                  <TextField
                    type={showPass ? "text" : "password"}
                    fullWidth
                    label="Confirme a nova senha"
                    placeholder="Confirme a nova senha"
                    variant="outlined"
                    required
                    onChange={(e) => setSenhaNovaConf(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password"
                            edge="end"
                            onClick={handlePassVisibilty}
                          >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => handleChangePassword()}
                  >
                    Salvar Alterações
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HomeAluno;
