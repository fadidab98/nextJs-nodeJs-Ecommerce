import dynamic from 'next/dynamic';
import React from 'react'
const MainLinksMd = dynamic(()=>import('./MainLinksMd'),{ssr:false});

function SideNav() {
  return (
    <div className='fixed left-0 top-0 bottom-0 mt-20 w-60 bg-sky-700 z-50 xl:hidden lg:hidden'><MainLinksMd/></div>
  )
}

export default SideNav