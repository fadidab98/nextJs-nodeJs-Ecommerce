import { useGetAllPermissionsQuery } from '@/store/dataApi/dashboard/permissionApi';
import { useAddUserMutation } from '@/store/dataApi/dashboard/usersApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select'



const Pills =()=>{
  const router = useRouter()
  const [addUser , result] = useAddUserMutation()
  const {data} = useGetAllPermissionsQuery();

  const optionList = [data?.data?.map(val=>{
    return{value:val.id,label:val.name}
  })];

      const [inputs,setInputs] = useState({
        //1
        name:'',
        //2
        
        email:'',
         //3
        role: 0,
        //4
        password:'',
        //5
        permissions:[],
       

      })
      useEffect(() => {
        const use = async () => {
          (await import('tw-elements')).default;
            };
            use();
          }, []);

          console.log(inputs.permissions)
        
      const InputHandler =(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value})
      }
    



      function handleSelect(data) {
        setInputs({...inputs,permissions:data})
      }


       const submitHandler=(e)=>{
        e.preventDefault();
        addUser(inputs);


       }
       if(result.data?.status == 200)
       {
        router.push('/dashboard/users')
       }
    return (<>  
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
            >User Permissions</a>
        </li>
      
   
      
      </ul>
      {result.data?.details?<ul className="p-4">{result.data?.details.map(error=><li key={Math.random()} className="text-red-500">{error.message}</li>)}</ul>:''}
      <form className="mb-6">
         {/* data */}
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          data-te-tab-active>
       
           

            <div className="px-4">
            <div className="flex flex-col my-2">
                {/* user name */}
                <input id="categoryName" value={inputs.title} onChange={InputHandler} name='name' type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="User Name"/>
            </div>
            <div className="flex flex-col my-2">
                {/* user name */}
                <input id="categoryName" value={inputs.email} onChange={InputHandler} name='email' type="email" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="User Email"/>
            </div>
            <div className="flex flex-col my-2">
                {/* user name */}
                <input id="categoryName" value={inputs.password} onChange={InputHandler} name='password' type="password" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="User Password"/>
            </div>


              <div className="flex flex-col">

                  <div className="mb-3 w-full">
                      <select id="categoryStatus" value={inputs.role} onChange={InputHandler} name='role' className="bg-gray-100 text-gray-500 border-2 p-2 focus:outline-2 focus:outline-sky-400 w-full" placeholder="Status">
                      <option className="p-4" value="0"> Admin</option>
                      <option value="1">User</option>
                    
                      </select>
                  </div>
              </div>
            </div>

           

        </div>
         {/* data End */}
        {/* details */}
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-details"
          role="tabpanel"
          aria-labelledby="pills-details-tab"
         >
              <div className="px-4">
           
            <div className="flex ">
              <div className=' w-full'>
                <label className='text-sm text-gray-600 mr-5'>user Permissions :</label>
                <Select
                className='w-full'
                    options={optionList[0]}
                    placeholder="Select Permissions"
                    value={inputs.color}
                    onChange={handleSelect}
                    isMulti
                  />
              </div>
            </div>
              <button onClick={submitHandler} className="bg-sky-800 px-3 py-1 w-full rounded-md  text-white" >Save</button>
            </div>
          </div>
         
   
  
      </form></>)
}

export default Pills