import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AlterarSenha() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState();
  const [senhaNova, setSenhaNova] = useState();
  const [senhaNovaConf, setSenhaNovaConf] = useState();

  // Esta função deverá fazer uma requisição ao servidor de modo assincrono
  // por enquanto apenas mostra os valores inseridos no formulario e navega
  // para a tela home
  const handleChangePassword = async () => {
    console.log(senhaAntiga, senhaNova, senhaNovaConf);
    navigate("/home-aluno");
  };

  const handlePassVisibilty = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      {/* Mostra o formulario para aletrar a senha */}
      <Grid
        item
        spacing={2}
        direction="column"
        justifyContent="center"
        marginTop={10}
      >
        <Grid item width="80%" margin="auto">
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Typography variant="h3" fontWeight="bold" textAlign="center">
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
              <Grid item marginTop={5}>
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
    </>
  );
}

export default AlterarSenha;
