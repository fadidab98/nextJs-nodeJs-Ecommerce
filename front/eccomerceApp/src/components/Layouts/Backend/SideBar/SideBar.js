import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {FaDashcube} from 'react-icons/fa';
import {FiUsers} from 'react-icons/fi';
import {BiCategory} from 'react-icons/bi';
import {MdProductionQuantityLimits,MdKeyboardArrowDown} from 'react-icons/md'
const SideBar =()=>{
    const [toggle ,setToggle] =useState({
        users:false,
        categories:false,
        products:false
    });
    const togglered = useSelector(state=>state.setting.setting.dashToggle)


  const [permissions,setPermissions] = useState([])

    useEffect(()=>{
            setPermissions( JSON.parse(localStorage.getItem('per')))
    },[]) // 0_0
 
    return(
    <div className={`${togglered? 'w-24':'w-60'} min-h-screen  bg-sky-700 fixed left  duration-300 `}>
        <div className="py-3 px-5 flex items-center">
            <div className="relative">
        <Image src="https://img.icons8.com/external-others-inmotus-design/67/null/external-D-alphabet-others-inmotus-design-13.png" priority width='40' height="30" alt="No Image"/>
        </div>
         <h2 className={`${togglered?'hidden ':''} text-2xl text-white ml-2 `}> Dashboard</h2>

        </div>
      <ul className="flex flex-col w-full h-auto text-white p-3">
        <li className="w-full  bg-sky-800 rounded-md my-2">
            <Link className={`flex items-center  py-2 ${togglered? 'pl-2 justify-center' :'px-5'}`} href={'/dashboard'}><span className="mr-2 "><FaDashcube/></span><span className={`${togglered?'hidden':''}`}>Dashboard</span></Link>
        </li>



        <div className="relative">
        {permissions.indexOf('view-users') !== -1 ?(<>
            <li className={`w-full  bg-sky-800 rounded-md my-2   py-1 flex justify-between  items-center ${togglered? 'pl-2' :'px-5'}`}>
          <div  className="flex items-center"><span className=" mr-2"><FiUsers/></span> <span className={`${togglered?'hidden':''}`}>Users</span>   </div>  <button onClick={(e)=> setToggle({users:!toggle.users})} className="text-2xl float-right flex h-auto items-center px-3 m-0"><MdKeyboardArrowDown/></button>
        </li>
        <ul className={`${!toggle.users?' hidden ':'flex '} ${togglered? ' absolute  left-20 top-4 bg-sky-900 rounded-md flex flex-col  w-40 ':'  flex-col w-full bg-sky-900 rounded-md' }  `}>
        {permissions.indexOf('view-users') !== -1 ?( <li className=" border-b-2  border-sky-700 "><Link href="/dashboard/users"  className={`${togglered? 'text-md px-5': ' px-10 '} block  py-2`}>Users List</Link>  </li>):('') }  
        {permissions.indexOf('create-user') !== -1 ?(<li className={` ${togglered?'':' border-b-2  border-sky-700'}`}><Link href="/dashboard/users/create_user"  className={`${togglered? 'text-md px-5': ' px-10 '} block  py-2`}>Create User</Link></li>):('')} 

        </ul>
        </>):('')}
        </div>

        <div className="relative">

        {permissions.indexOf('view-categories') !== -1 ?(<>
            <li className={`w-full  bg-sky-800 rounded-md my-2   py-1 flex justify-between  items-center ${togglered? 'pl-2' :'px-5'} `}>
            <div  className="flex items-center"><span className=" mr-2"><BiCategory/></span> <span className={`${togglered?'hidden':''}`}>Categories</span>  </div><button onClick={()=>setToggle({categories:!toggle.categories})} className="text-2xl float-right flex h-auto items-center px-3 m-0"><MdKeyboardArrowDown/></button >
        </li>
        <ul className={`${!toggle.categories?' hidden ':'flex '} ${togglered? ' absolute  left-20 top-4 bg-sky-900 rounded-md flex flex-col  w-40 ':'  flex-col w-full bg-sky-900 rounded-md' }  `}>
        {permissions.indexOf('view-categories') !== -1 ?( <li className=" border-b-2  border-sky-700 "><Link href="/dashboard/categories"  className={`${togglered? 'text-md px-5': ' px-10 '} block  py-2`}>Categories List</Link>  </li>):('') }  
        {permissions.indexOf('create-category') !== -1 ?(<li className={` ${togglered?'':' border-b-2  border-sky-700'}`}><Link href="/dashboard/categories/create_category"  className={`${togglered? 'text-md px-5': ' px-10 '} block  py-2`}>Create Category</Link></li>):('')} 

        </ul>
        </>):('')}
        </div> 
        <div className="relative">
       {permissions.indexOf('view-products') !== -1 ?(
         <>
        <li className={`w-full  bg-sky-800 rounded-md my-2   py-1 flex justify-between  items-center ${togglered? 'pl-2' :'px-5'}`}>
        <div  className="flex items-center"><span className=" mr-2"><MdProductionQuantityLimits/></span><span className={`${togglered?'hidden':''}`}>Products</span>   </div><button onClick={()=>setToggle({products:!toggle.products})} className="text-2xl float-right flex h-auto items-center px-3  m-0"><MdKeyboardArrowDown/></button >
        </li>
        <ul className={`${!toggle.products?' hidden ':'flex '} ${togglered? ' absolute  left-20 top-4 bg-sky-900 rounded-md flex flex-col w-40 ':'  flex-col w-full bg-sky-900 rounded-md' } z-20 `}>
          {permissions.indexOf('view-products') !== -1 ? (<li className=" border-b-2  border-sky-700 "><Link href="/dashboard/products"  className={`${togglered? 'text-md px-5': ' px-10 '} block  py-2`}>Products List</Link>  </li>):('')}
          {permissions.indexOf('create-product') !== -1 ? (<li className={` ${togglered?'':' border-b-2  border-sky-700'}`}><Link href="/dashboard/products/create_product" className={`${togglered? 'text-md px-5': ' px-10 '} block  py-2`}>Create Product</Link>  </li>):('')} 

        </ul>
        </>
        ):('')} 
       </div>
    </ul>
    
    
    
    
    
    
    
    </div>);
}


export default SideBar;