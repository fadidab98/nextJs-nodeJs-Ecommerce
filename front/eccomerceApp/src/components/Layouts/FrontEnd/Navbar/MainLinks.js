
import styles from '../../../../../styles/Front/Navbar.module.css'
import Link from 'next/link';

const MainLinks =()=>{
    return(<>
      <ul className={'flex items-center h-full md:hidden sm:hidden'}>
                <li className=' h-full flex items-center  hover:text-sky-300 '><Link className='block h-full flex items-center p-2' href='/'>Home</Link></li>
                <li className={' h-full flex items-center  relative ' + styles.fatherDrop}><Link className='block h-full flex items-center p-2' href="/category">Category</Link>
                <div className={styles.dropdown +' z-10'}>
               <ul >
                
                    <li className='text-white hover:text-sky-300 '><Link href="/category/1">Mobile</Link><span></span></li>
                    <li className='text-white hover:text-sky-300'><Link href="/category/2">Computer</Link><span></span></li>

                    <li className='text-white hover:text-sky-300'><Link href="/category/3">hardware</Link><span></span></li>

                
               


                </ul> 
                </div>
                
                </li>
                <li className='h-full hover:text-sky-300 '><Link className='block h-full flex items-center p-2' href="/about">About</Link></li>
                
                </ul>
    </>)
}
export default MainLinks