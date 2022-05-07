import React , {useContext, useState} from "react";
import { TextField , Button} from "@mui/material";
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import axios from "axios"
const ProjectForm = ({projects, setProjects, handleClose}) => {
  // e.preventDefault();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("/api/projects/create", {
        name,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${appState.token}`,
        },
      });
      appDispatch({
        type: "SET_PROJECT",
        payload: response.data,
      })
      setProjects([...projects, response.data])
      setName('')
      setDescription('')
      handleClose()
    }catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Project Form</h1>
      <form className="mt-4" noValidate>
        <div className="form-group">
          <TextField fullWidth id="name" label="Project Name" onChange={e => setName(e.target.value)} value={name} variant="outlined" />
        </div>
        <div className="form-group mt-3">
          <TextField fullWidth id="description" label="Project Description" onChange={e=> setDescription(e.target.value)} value={description} variant="outlined" />
        </div>
        <div className="text-end mt-4">
          <Button variant="contained" fullWidth onClick={(e) => handleSubmit(e)}>Submit</Button>
        </div>
        </form>
    </div>
  )
}
export default ProjectForm