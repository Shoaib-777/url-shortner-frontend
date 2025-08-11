import React from 'react'
import Navbar from '../components/Navbar'
import LinkInput from '../components/LinkInput'
import NoShortLinks from '../components/NoShortLinks'
import ShortLinksTable from '../components/ShortLinksTable'
import { UseAuthStore } from '../store/UseAuthStore'
import Loading from '../components/Loading'

const Home = () => {
  const { IsLogin, IsLoading } = UseAuthStore()
  return (
    <div className='w-full h-screen bg-[#0B101B] py-6 flex flex-col overflow-y-auto'>
      <Navbar />
      <LinkInput />
      {IsLoading ? (
        <Loading />
      ) : (
        IsLogin ? (
          <ShortLinksTable />
        ) : (
          <NoShortLinks />
        )
      )}

    </div>
  )
}

export default Home