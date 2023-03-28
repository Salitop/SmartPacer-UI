import {
  AppBar,
  Button,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

function Navbar() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container>
            <Grid item xs={5}>
              <Stack direction="row">
                <Button>
                  <Link to="/login" style={linkStyle}>
                    <Typography color="white">Log-off</Typography>
                  </Link>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
