import React, {useState, useContext, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios'
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";
import {setCookie} from "../Functions/cookies";
import {useNavigate} from 'react-router-dom';


const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  // check if logged in already navigate to dashboard
  // useEffect(() => {
  //   if (appState.loggedIn) {
  //     navigate('/dashboard')
  //   }
  // }, [])
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData(event.currentTarget)
    let email = data.get("email")
    let password = data.get("password")
    if (email && password !== '') {
      console.log('making Request')
      try {
          const response = await axios.post(`/api/users/login`, { email: email, password: password })
          console.log(response)
          if (response.data.email === email) {
              setLoading(false)
          //     // setSuccess(true)
              // console.log(response.data)
              let user = {
                  id: response.data._id,
                  firstName: response.data.firstName,
                  lastName: response.data.lastName,
                  email: response.data.email,
                  avatar: response.data.avatar,
              }
              appDispatch({ type: "login", loggData: user, projects: response.data.projects, token: response.data.token })
              setCookie('auth', response.data.token, 1)
              // navigate to dashboard route
              // navigate('/dashboard')

              
          }
      } catch (err) {
          setLoading(false)
          console.log('error', err)
          // setAlertMessage({ open: true, message: e.response.data.message, alertSuccess: false })

      }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
