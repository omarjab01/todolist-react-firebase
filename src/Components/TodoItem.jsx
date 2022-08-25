import React from 'react'

const TodoItem = (props) => {
    return (
        <div key={props.task.id} className="flex flex-row items-center gap-4 border-b border-blue-100 py-4 justify-between">
            {/* <button onClick={() => updateTask(task.id)}>✅</button> */}
            <div className='flex flex-row gap-4 items-center'>
                {
                    !props.task.completed && <div className="w-6 h-6 border rounded-full border-gray-800" onClick={() => props.updateTask(props.task.id)} />

                }
                <h4 className="text-md font-medium">{props.task.taskName}</h4>
            </div>
            
            <button  onClick={() => props.deleteTask(props.task.id)} className='text-red-500'>Delete</button>
            
        </div>
    )
}

export default TodoItem