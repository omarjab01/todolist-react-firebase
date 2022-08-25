import Form from "./Components/Form";
import { createContext, useEffect, useState } from 'react'
import { auth, db } from './Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import NavBar from "./Components/NavBar";
import { collection, addDoc, getDoc, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore'
import NavList from "./Components/NavList";
import TodosNormal from "./Components/TodosNormal";
import CompletedTasks from "./Components/CompletedTasks";

export const AppContext = createContext();

function App() {

  const [newTask, setNewTask] = useState('')
  // id, taskname, completed: boolean

  // Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  // Sign In
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('')

  const [openRegister, setOpenRegister] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  const [todos, setTodos] = useState([])
  const [todosCompleted, setTodosCompleted] = useState([])

  const [user, setUser] = useState({})

  const [activeTasks, setActiveTasks] = useState(true)

  const addTask = async (e) => {
    e.preventDefault()
    const task = {
      taskName: newTask,
      completed: false,
      idUser: user.uid,
    }
    try{
      await addDoc(tasksDB, task)
    }catch(error){
      console.log(error.message)
    }
    setNewTask('')
  }

  const updateTask = async (id) => {
    // e.preventDefault();
    try{
      const taskDoc = doc(db, 'tasks', id)
      await updateDoc(taskDoc, {
        completed: true,
      })
      console.log(taskDoc)
    }catch(error){
      console.log(error.message)
    }
  }

  const deleteTask = async (id) => {
    try{
      const taskDelDoc = doc(db, 'tasks', id)
      await deleteDoc(taskDelDoc)
      console.log(taskDelDoc)
    }catch(error){
      console.log(error.message)
    }
  }

  const registerUser = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
    }
    catch(error){
      console.log(error.message)
    }
    setEmail('')
    setPassword('')
    setOpenRegister(false)
  }

  const loginUser = async () => {
    try{
      await signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
      console.log("login")
    }catch(error){
      console.log(error.message)
    }
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    setOpenLogin(false)
  }

  const logOut = async () => {
    try{
      await signOut(auth)
    }catch(error){
      console.log(error.message)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    getTasksFromDB();
   //  console.log(user.uid)
  }, [todos, user])


  const tasksDB = collection(db, 'tasks')

  const getTasksFromDB = async () => {
    const data = await getDocs(tasksDB)
    const dataDB = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setTodos(dataDB.filter((doc) => (doc.idUser === user.uid && doc.completed !== true)))
    setTodosCompleted(dataDB.filter((doc) => (doc.idUser === user.uid && doc.completed !== false)))
  }

  return (
    <div className="App max-w-md mx-auto py-4">
      <AppContext.Provider value={{newTask, setNewTask, addTask, email, setEmail, password, setPassword, openRegister, setOpenRegister, openLogin, setOpenLogin, user, logOut, activeTasks, setActiveTasks, todos, updateTask, todosCompleted, setTodosCompleted, deleteTask}}>

        <NavBar />
        {
          <div>
        <Form />

        {
          openRegister && 
            <div className="w-72 mx-auto flex flex-col gap-2 p-4 shadow-lg form-auth bg-white">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">Sign Up</h2>
                <button onClick={() => setOpenRegister(false)}>X</button>
              </div>
              <div className="w-full flex flex-col gap-2 my-4">
                <input type="text" placeholder="Email" className="rounded-md p-2 border w-full" value={email} onChange={event => setEmail(event.target.value)} />
                <input type="password" placeholder="Password" className="rounded-md p-2 border w-full" value={password} onChange={event => setPassword(event.target.value)} />
              </div>
              <button className="bg-blue-500 py-2 rounded-lg text-white" onClick={registerUser}>Create Account</button>
            </div>
        }

        {
          openLogin && 
            <div className="w-72 mx-auto flex flex-col gap-2 p-4 shadow-lg form-auth bg-white">
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold">Login</h2>
                <button onClick={() => setOpenLogin(false)}>X</button>
              </div>
              <div className="w-full flex flex-col gap-2 my-4">
                <input type="text" placeholder="Email" className="rounded-md p-2 border w-full" value={emailLogin} onChange={event => setEmailLogin(event.target.value)} />
                <input type="password" placeholder="Password" className="rounded-md p-2 border w-full" value={passwordLogin} onChange={event => setPasswordLogin(event.target.value)} />
              </div>
              <button className="bg-blue-500 py-2 rounded-lg text-white" onClick={loginUser}>Login</button>
            </div>
        }
        <NavList />
        {
          user ? (activeTasks ? (
            <TodosNormal />
          ) : <CompletedTasks />) : <h2 className="text-blue-400 my-32">You Must be logged in first</h2>
        }
        
        </div>
      }
      </AppContext.Provider>
    </div>
  );
}

export default App;
