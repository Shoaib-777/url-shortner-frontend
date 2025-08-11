import React from 'react'
import { CiLogin } from "react-icons/ci";
import { UseAuthStore } from '../store/UseAuthStore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { IsLogin,logout } = UseAuthStore()

  const handleLogout = async()=>{
    await logout()
  }

  return (
    <nav className='container max-h-[60px] mx-auto px-2 sm:px-6 md:px-8 lg:px-12 '>
      <div className='w-full h-full border border-yellow-400 shadow-amber-200 shadow-sm px-2 sm:pl-2 sm:pr-1 py-3 rounded-full flex justify-between items-center  flex-1'>
        <div>
          <h2 className="font-bold text-xl custom-gradient">
            LinkShortner
          </h2>
        </div>
        <div className='flex justify-between items-center gap-x-2 sm:gap-x-3'>
          {!IsLogin &&(
          <div>
            <Link to={'/signup'}><button className='bg-[#144EE3] hover:bg-[#134ad5] shadow-sky-500 shadow-[4px_5px_6px_-2px] cursor-pointer text-lg  text-white min-w-[100px] h-[44px] rounded-3xl font-semibold flex justify-center items-center'>
              Register
            </button></Link>
          </div>
          )}
          <div>
            {IsLogin ? (
              <button onClick={handleLogout} className='bg-red-500 text-white min-w-[100px] h-[44px] rounded-3xl cursor-pointer font-semibold flex justify-center items-center gap-x-2 ring-1 ring-[#C9CED6]'>
                <span className='text-lg'>Logout</span>
                <CiLogin className='text-[#C9CED6] size-6' />
              </button>
            ) : (
              <Link to={'/login'}><button className='bg-[#353C4A] text-white min-w-[100px] h-[44px] rounded-3xl cursor-pointer font-semibold flex justify-center items-center gap-x-2 ring-1 ring-[#C9CED6]'>
                <span className='text-lg'>Login</span>
                <CiLogin className='text-[#C9CED6] size-6' />
              </button></Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar