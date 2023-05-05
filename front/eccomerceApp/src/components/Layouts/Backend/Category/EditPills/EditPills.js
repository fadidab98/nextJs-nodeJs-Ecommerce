import { useGetCategoryByIdQuery, usePostCategoryMutation, useUpdateCategoryMutation } from "@/store/dataApi/dashboard/categoryApi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"



const EditPills =(props)=>{
  const router = useRouter()
  const [updateCategory,result] = useUpdateCategoryMutation();
  const {data:category} = useGetCategoryByIdQuery(props.data)
  const category1 = category?.data[0];

  const [inputs,setInputs] = useState({
    category_title:'',
    category_meta_title:'',
    category_description:'',
    category_meta_description:'',
    status:'',
    id:props?.data
  })

  const inputHandler=(e)=>{
      setInputs({...inputs,[e.target.name]:e.target.value})
  }
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
        };
        use();
      }, []);
useEffect(()=>{
  setInputs({
      category_title:category1?.category_title,
      category_meta_title:category1?.category_meta_title,
      category_description:category1?.category_description,
      category_meta_description:category1?.category_meta_description,
      status:category1?.status,
      id:props?.data
    }
      )

},[category1])

  const submitHandler=(e)=>{
    e.preventDefault();

    updateCategory(inputs)

    


  }
  if(result.data?.status ==200)
  {
    router.push('/dashboard/categories')

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
            >Data</a>
          
        </li>
        <li role="presentation">
          <a
            href="#pills-profile"
            className="my-2 block rounded bg-neutral-100 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="pills-profile-tab"
            data-te-toggle="pill"
            data-te-target="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            >SEO Data</a>
        </li>
   
      
      </ul>
      {result.data?.details?<ul className="p-4">{result.data?.details.map(error=><li key={Math.random()} className="text-red-500">{error.message}</li>)}</ul>:''}

      <form className="mb-6">
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          data-te-tab-active>
       
            {/* data */}

            <div className="px-4">
            <div className="flex flex-col my-2">
                {/* category name */}
                <input id="categoryName" name="category_title" onChange={inputHandler} value={inputs.category_title} type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Category Name"/>
            </div>

            <div className="flex flex-col my-2">
                {/* category name */}
                <textarea id="categoryDescription" rows={'8'} name="category_description" onChange={inputHandler} value={inputs.category_description} type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Category Description"></textarea>
            </div>


            <div className="flex flex-col">

                <div className="mb-3 w-full">
                    <select id="categoryStatus" name="status" onChange={inputHandler} value={inputs.status}  className="bg-gray-100 text-gray-500 border-2 p-2 focus:outline-2 focus:outline-sky-400 w-full" >
                    <option className="p-4" value="1">One</option>
                    <option value="2">Two</option>
                   
                    </select>
                </div>
                </div>
            </div>





        </div>
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab">
           <div className="px-4">
            <div className="flex flex-col my-2">
                {/* category name */}
                <input id="categoryName" name="category_meta_title" onChange={inputHandler} value={inputs.category_meta_title} type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Category SEO Name"/>
            </div>

            <div className="flex flex-col my-2">
                {/* category name */}
                <textarea id="categoryDescription" rows={'8'} name="category_meta_description" onChange={inputHandler} value={inputs.category_meta_description} type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Category SEO  Description"></textarea>
            </div>

            </div>
            <div className="w-full text-center">
            <button onClick={submitHandler} className="p-3 bg-sky-800 rounded-md m-auto text-white">Save</button>
            </div>
            
        </div>
  
      </form></>)
}

export default EditPills