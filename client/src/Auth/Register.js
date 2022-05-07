import React, {useState, useContext} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import axios from "axios"
import {setCookie} from '../Functions/cookies'
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if(password === confirmPassword){

      if (firstName && lastName && email && password !== "") {
        try {
          const response = await axios.post(`/api/users`, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          })
          let user = {
            id: response.data._id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            avatar: response.data.avatar,
            projects: response.data.projects,
        }
        appDispatch({ type: "login", loggData: user, token: response.data.token })
        setCookie('auth', response.data.token, 1)
        setLoading(false)
        navigate('/')
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Passwords do not match")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack
            mt={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              onChange={(e)=>setFirstName(e.target.value)}
              value={firstName}
              label="First Name"
              name="fname"
              autoComplete="fname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e)=>setLastName(e.target.value)}
              value={lastName}
              name="lname"
              label="Last Name"
              type="text"
              id="lname"
              autoComplete="lname"
            />
          </Stack>
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            onChange={(e)=>setConfirmPassword(e.target.value)}
            value={confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="con-password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid item>
            <Link href="./" variant="body2">
              {"Already have a account? Login"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
