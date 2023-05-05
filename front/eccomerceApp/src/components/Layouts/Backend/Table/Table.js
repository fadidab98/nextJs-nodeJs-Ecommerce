import Link from "next/link";
import Pagination from "../../FrontEnd/Pagination/Pagination";




const Table =({props,children})=>{
    return(<>

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center ">
    
        {children}
    </table>
    
        
    </>)
}


export default Table;