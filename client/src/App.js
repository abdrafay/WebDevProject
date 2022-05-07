import "./App.css";
import { useReducer, useEffect } from "react";
import Navbar from "./Navbar/Navbar.js";
import Login from "./Auth/Login.js";
import Register from "./Auth/Register.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import { getCookie, setCookie, erase } from "./Functions/cookies";
import Task from "./Task/Task";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = ({history}) => {
  const initialState = {
    loggedIn: Boolean(getCookie("auth")),
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: getCookie("auth") ? getCookie("auth") : null,
    projects: localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects"))
      : [],
    tasks: localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  };
  const ourReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          loggedIn: true,
          user: action.loggData,
          token: action.token,
        };
      case "LOGOUT":
        return {
          ...state,
          loggedIn: false,
          user: null,
          token: null,
        };
      case "SET_PROJECT":
        return {
          ...state,
          projects: action.payload,
        };
      case "setTasks":
        return {
          ...state,
          tasks: action.tasks,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(ourReducer, initialState);
  // set Projects to LocalStorage
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("projects", JSON.stringify(state.projects));
    } else {
      localStorage.removeItem("projects");
    }
  }, [state.loggedIn, state.projects]);
  // set Tasks to LocalStorage
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [state.loggedIn, state.tasks]);
  // set User Details to Local Storage
  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.loggedIn, state.user]);
  // set And Remove Token from cookie using cookies functions
  useEffect(() => {
    if (state.loggedIn) {
      setCookie("auth", state.token,1);
    } else {
      erase("auth");
      // navigate("/")
      console.log(history)
    }
  }, [state.loggedIn, state.token]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={darkTheme}>
          <Navbar />
          <Router>
            <Routes>
              {state.loggedIn ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/project/:id" element={<Task />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
          </Router>
        </ThemeProvider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default App;
