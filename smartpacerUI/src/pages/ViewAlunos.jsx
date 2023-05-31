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
    const [alunoInfo, setAlunoInfo] = useState([]);
  
    const fetchDataAluno = async () => {
      Axios.get('http://edryanmaciel.pythonanywhere.com/obterUsuarioAndEquipe').then((response) => {setAlunoInfo(response.data)});
    }

      // buscar Equipes
  React.useEffect(() => {
    fetchDataAluno();
  }, []);
  
  function eventoVoltar(){
    navigate("/home-prof")
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
                Gestão de alunos
              </Typography>
              <form>
                <Grid container direction="column" spacing={4}>
                <Grid sx={{alignSelf: "center", paddingTop: 8}}>
                <TableContainer component={Paper}>
        <Table sx={{ width: 450 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Equipe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* trocar rows por notasPacer */}
            {alunoInfo.map((row) => (
              <TableRow
                key={row.nomeAluno}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell> {row.nome} </TableCell> 
                <TableCell> {row.nomeEquipe} </TableCell>
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
  