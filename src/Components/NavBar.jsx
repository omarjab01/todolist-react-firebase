import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

const NavBar = () => {
    const {setOpenRegister, setOpenLogin, user, logOut} = useContext(AppContext)
    return (
        <nav className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-medium">Todo List</h1>
            {
                !user ?
                    <div className='flex flex-row gap-4'>
                        <button onClick={() => setOpenRegister(true)} className="text-blue-500">Sign Up</button>
                        <button onClick={() => setOpenLogin(true)} className='bg-blue-500 px-4 py-2 rounded-lg text-white' >Sign In</button>
                    </div>
                    : <button onClick={logOut}>Sign Out</button>
            }
            
        </nav>
    )
}

export default NavBar