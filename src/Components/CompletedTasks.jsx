import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'
import TodoItem from './TodoItem'

const CompletedTasks = () => {
    const {todosCompleted, setTodosCompleted, deleteTask} = useContext(AppContext)
  return (
    <div className='flex flex-col gap-3'>
        {
            todosCompleted.map((task) => (
                <TodoItem 
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                />
            ))
        }
    </div>
  )
}

export default CompletedTasks