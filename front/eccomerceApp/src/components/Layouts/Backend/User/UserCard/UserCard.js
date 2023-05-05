import { useDestroyProductMutation } from "@/store/dataApi/dashboard/productApi";
import { useDeleteUserMutation } from "@/store/dataApi/dashboard/usersApi";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";




const UserCard =(props)=>{
   
const user = props.data?.data
const Permissions = props.data?.permission[0]?.permissionName
const router = useRouter()

const perArray = Permissions?.split(',');
const [deleteUser,result] = useDeleteUserMutation()

/* 
if(result?.data?.status ==200)
{
    router.push('/dashboard/products')
}
 */
console.log(props.data?.permission[0]?.permissionName)

    useEffect(() => {
        const use = async () => {
          (await import('tw-elements')).default;
            };
            use();
          }, []);


      return(<div className=" bg-gray-50 ">
      
        {/* Info */}
        <div className="w-4/5 bg-white m-auto px-4 mb-4 rounded-md shadow-md">
        <ul
        className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row w-full justify-center"
        id="pills-tab"
        role="tablist"
        data-te-nav-ref>
        <li role="presentation">
          <a
            href="#pills-home"
            className="my-2 block rounded bg-neutral-100 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="pills-home-tab"
            data-te-toggle="pill"
            data-te-target="#pills-home"
            data-te-nav-active
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            >User Details</a>
          
        </li>
        <li role="presentation">
          <a
            href="#pills-details"
            className="my-2 block rounded bg-neutral-100 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="pills-details-tab"
            data-te-toggle="pill"
            data-te-target="#pills-details"
            role="tab"
            aria-controls="pills-details"
            aria-selected="false"
            >User Permissions </a>
        </li>
    
        
   
      
      </ul>
      <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          data-te-tab-active>
           <div className="flex w-full flex-col">

            <div className="flex text-sky-900 items-center"> <span > User Name :</span><h1 className="text-xl my-2 mx-3">   {user?.name}</h1></div>

            <h3 className="text-sky-900 text-md my-2">Email : <span className="px-4 py-1 text-sky-900  ">{user?.email}</span> </h3>
            <h4 className="text-sky-900 my-2">Role : <span className="px-4 py-1 bg-sky-900 text-white rounded-md"> {user?.role ==1 ? 'admin':'user'}</span></h4>



          </div>
       </div>
       <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-details"
          role="tabpanel"
          aria-labelledby="pills-details-tab"
         >
            <div className="flex flex-col">
            <h3 className="text-sky-900 text-md my-2">Permissions : <span className="text-sky-900 ">{perArray?.length}</span> </h3><div className="flex w-full flex-wrap h-full"> {perArray?.map(per=>{
                return <span key={per} className="bg-sky-800 px-4 py-1 rounded-md text-white m-2">{per}</span>
            })} </div>
       

            </div>
            
            </div>
         
        </div>

        <div className="flex w-full">
                <Link className="w-1/2 bg-sky-800 rounded-md py-1 text-white text-center mx-2" href={`/dashboard/users/edit/${user?.id}`} >Edit</Link>
                <button onClick={()=>{deleteUser({id:user.id}).then(()=>router.push('/dashboard/users'))}} className="w-1/2 bg-red-800 rounded-md py-1 text-white text-center mx-2" >Delete</button>
            
            </div>
        
    </div>)
}



export default UserCard