import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { usernameContext } from "./Context/Context.jsx";
import {DialogBoxContext} from "./Context/DialogBoxContext.jsx"

const Root = () => {
  const [username, setUsernameState] = useState(localStorage.getItem("username") || null);
  const [fullname, setFullnameState] = useState(localStorage.getItem("fullname") || null);
  const [changePassword, setChangePassword]=useState(false)
  const [deleteAccount, setDeleteAccount]=useState(false)
  const [AddProblemState,setAddProblemState]=useState(false)
  const [NotesState,setNotes]=useState(false)
  const [pid, setpid]=useState()
  const [Refresh, setRefresh]=useState(false)
  const [cards,setCards]=useState([])
  const [currentTopic, setCurrentTopic]=useState("All Topics")

    const setUsername = (name) => {
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
    setUsernameState(name);
  };

    const setFullname=(name)=>{
      if(name){
        localStorage.setItem("fullname",name)
      }else{
        localStorage.removeItem("fullname")
      }
      setFullnameState(name)
    }


  return(
    <usernameContext.Provider value={{ username, setUsername,fullname,setFullname}}>
        <DialogBoxContext.Provider value={{changePassword,setChangePassword, deleteAccount, setDeleteAccount, AddProblemState,setAddProblemState, NotesState, setNotes, pid, setpid, Refresh,setRefresh, cards, setCards, currentTopic, setCurrentTopic}}>
      <App />
        </DialogBoxContext.Provider>
    </usernameContext.Provider>
  );
};

createRoot(document.getElementById('root')).render(<Root />)
