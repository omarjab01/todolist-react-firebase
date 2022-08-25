import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

const NavList = () => {
    const {activeTasks, setActiveTasks} = useContext(AppContext)

    const styleSelected = {
      cursor: "Pointer",
      backgroundColor: 'blue',
    }

  return (
    <ul className='flex flex-row gap-8 my-12 items-center'>
        <li onClick={() => setActiveTasks(true)} className={activeTasks ? `cursor-pointer bg-blue-500 px-4 py-2 text-white rounded-xl transition duration-500 ease-in-out` : `cursor-pointer transition duration-500 ease-in-out` }>Tasks</li>
        <li onClick={() => setActiveTasks(false)} className={!activeTasks ? `cursor-pointer bg-blue-500 px-4 py-2 text-white rounded-xl transition duration-500 ease-in-out` : `cursor-pointer transition duration-500 ease-in-out` }>Completed</li>
    </ul>
  )
}

export default NavList