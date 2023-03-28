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

function Login(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
    login: props.login,
  });

  const handlePassVisibilty = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };

  const handleSubmit = (e) => {
    if (values.email === "user") {
      if (values.pass === "aluno") {
        navigate("/home-aluno");
      } else if (values.pass === "professor") {
        navigate("/home-prof");
      }
    } else {
      alert("Usuario e/ou senha invalido(s)");
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
                    label="login"
                    placeholder="login"
                    variant="outlined"
                    required
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type={values.showPass ? "text" : "password"}
                    fullWidth
                    label="Senha"
                    placeholder="senha"
                    variant="outlined"
                    required
                    onChange={(e) =>
                      setValues({ ...values, pass: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password"
                            edge="end"
                            onClick={handlePassVisibilty}
                          >
                            {values.showPass ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button fullWidth variant="contained" onClick={handleSubmit}>
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
