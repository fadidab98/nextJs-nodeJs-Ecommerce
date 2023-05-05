import { changeToggle } from "@/store/settingSlice";
import Image from "next/image";

import { FaBars } from 'react-icons/fa'; 
import { useDispatch, useSelector } from "react-redux";
import DropDownUser from "./DropDownUser";

const Navbar = ()=>{
    const dispatch = useDispatch();
    const toggle = useSelector(state=>state.setting.setting.dashToggle)

    const changeToggleButton = ()=>{
        dispatch(changeToggle(toggle))
    }

    console.log(toggle)
    return (
       <nav className={   ` ${toggle?'ml-24' : 'ml-60'}  h-16 flex justify-between mb-5 shadow-md duration-300`}>

              <div className="flex items-center justify-center  pl-2 pr-4">
                <button onClick={changeToggleButton} className="text-sky-800 p-2 text-xl"><FaBars/></button>
              <input className=" h-10 rounded-full p-2 w-60 bg-gray-50 border border-2 border-gray-300 focus:outline-sky-600    " type='text'  placeholder="search"/>

              </div>
    
        <div className="flex items-center px-5">
            <DropDownUser/>

        </div>
       </nav>
    );
}

export default Navbar;