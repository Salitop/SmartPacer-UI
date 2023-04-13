import { Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function GestaoSprint() {
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
              Gestão de Sprints
            </Typography>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default GestaoSprint;
