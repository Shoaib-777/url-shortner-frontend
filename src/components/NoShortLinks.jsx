import React from 'react'
import { Link } from 'react-router-dom'

const NoShortLinks = () => {
  return (
    <div className='w-full container mx-auto py-6 mt-4 min-h-max'>
      <h1 className='text-sky-600 text-center font-bold text-xl md:text-2xl lg:text-4xl'>No Short Links <span className='text-red-600'>Yet </span>— Start Now And <span className='text-yellow-400'>Boost Your</span> Reach!</h1>
      <p className="text-center text-white font-bold text-lg sm:text-2xl">
       <span className='text-[#EB568E]'>Create an</span>  <Link to={'/signup'}><span className='text-red-600 underline cursor-pointer'>Account</span></Link> or <Link to={'/login'}><span className='text-blue-700 underline underline-offset-6 cursor-pointer'>Log In</span></Link> —<span className='custom-gradient'> Start Managing Your Short Links Today!</span>
      </p>
    </div>
  )
}

export default NoShortLinks