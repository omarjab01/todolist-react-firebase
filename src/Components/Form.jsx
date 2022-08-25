import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

const Form = () => {

    const {newTask, setNewTask, addTask} = useContext(AppContext)

  return (
    <form className='flex flex-row justify-between gap-4 my-8'>
        <input type="text" placeholder='New Task' className='w-full rounded-lg border p-2' value={newTask} onChange={(event) => setNewTask(event.target.value)} />
        <button className='bg-blue-400 px-4 py-2 rounded-lg text-white' onClick={addTask}>Add</button>
    </form>
  )
}

export default Form