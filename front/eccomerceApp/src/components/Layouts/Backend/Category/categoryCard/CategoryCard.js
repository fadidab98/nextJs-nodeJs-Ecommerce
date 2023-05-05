import { useDestroyCategoryMutation } from "@/store/dataApi/dashboard/categoryApi";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect } from "react";



const CategoryCard =(props)=>{
    console.log('CategoryCard',props.data?.data[0])
    const[destroyCategory,result] = useDestroyCategoryMutation()
  const router = useRouter()

    useEffect(() => {
        const use = async () => {
          (await import('tw-elements')).default;
            };
            use();
          }, []);

    const category = props.data?.data[0]



    if(result?.data?.status ==200)
    {
          router.push('/dashboard/categories')
    }
    return (<>
    <div className="flex  jsutify-betweeen w-full shadow-md py-3 ">
        <div className="w-1/2 ">

        <div className="w-full  h-96 relative z-10">

        <Image className="z-10" src="https://res.cloudinary.com/dg2c3liap/image/upload/v1677996937/mobile_resized_1_egggjw.png"   fill priority  alt="No Image"/>

        </div>
        
        <div className="w-full flex text-center">
          <Link className="w-1/2 mx-2 bg-sky-800  rounded-md text-white py-2" href={`/dashboard/categories/edit/${category?.id}`}>Edit</Link>
          <button onClick={()=>{destroyCategory({id : category?.id})}} className="py-2 w-1/2 mx-2  bg-red-800  rounded-md text-white" >Delete</button></div>

        </div>
        
        <div className="w-1/2 px-2">


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
            >
            SEO Data
      
            </a>
        </li>
   
      
      </ul>
      <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          data-te-tab-active>
                <div className="flex w-full flex-col">

                <div className="flex text-sky-900 items-center"> <span >Meta Title :</span><h1 className="text-xl my-2 mx-3">   {category?.category_title}</h1></div>
                
                <h3 className="text-sky-900 text-md my-2">Products in This Category : <span className="px-4 py-1 bg-sky-900 text-white rounded-md">{category?.CountProducts}</span> </h3>
                <h4 className="text-sky-900 my-2">Status : <span className="px-4 py-1 bg-sky-900 text-white rounded-md"> {category?.status ?'Visible':'Hidden'}</span></h4>
                <div className=" text-sky-900"> <span >Description :</span> <p className="text-sky-800 w-full "> {category?.category_description}</p></div>
               


                </div>

          </div>
          <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab">
            <div className="flex text-sky-900 items-center"> <span >Meta Title :</span>  <h1 className="text-xl my-2 mx-3">   {category?.category_meta_title}</h1></div>

           
            <div className=" text-sky-900"> <span >Meta Description :</span> <p className="text-sky-800 w-full "> {category?.category_meta_description}</p></div>

          </div>




        </div>
        
    </div>
    
</>
   
    )
}



export default CategoryCard