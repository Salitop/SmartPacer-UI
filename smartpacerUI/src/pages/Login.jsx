import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../Service";

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();

  const handlePassVisibilty = () => {
    setShowPass(!showPass);
  };

  const loginUser = async () => {
      const resp = await Service.post("https://edryanmaciel.pythonanywhere.com/login", {
        login,
        senha,
      });

    localStorage.setItem("id", resp.data.id);
    localStorage.setItem("nome", resp.data.nome);

    debugger;
    if (resp.data.login === "professor") navigate("/home-prof");
    else {
      if (resp.data.login != "professor") {
        navigate("/home-aluno");
      } else {
        alert("Usuario ou senha invalido");
      }
    }
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
              Smart Pacer - Login
            </Typography>
            <form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    label="Login"
                    placeholder="Login"
                    variant="outlined"
                    required
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type={showPass ? "text" : "password"}
                    fullWidth
                    label="Senha"
                    placeholder="senha"
                    variant="outlined"
                    required
                    onChange={(e) => setSenha(e.target.value)}
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
                    fullWidth
                    variant="contained"
                    onClick={() => loginUser()}
                  >
                    Acessar
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
