import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'
import TodoItem from './TodoItem'

const TodosNormal = () => {
    const {todos, updateTask, deleteTask} = useContext(AppContext)
  return (
    <div>
        {
            todos.map((task) => (
                <TodoItem 
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask = {deleteTask}
                />
              ))
        }
    </div>
  )
}

export default TodosNormal