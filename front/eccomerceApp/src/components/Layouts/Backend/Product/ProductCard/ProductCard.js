import { useDestroyProductMutation } from "@/store/dataApi/dashboard/productApi";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";




const ProductCard =(props)=>{
   
const product = props.data?.data[0]
const [destroyProduct ,result] = useDestroyProductMutation()
const router = useRouter()

const image = product?.product_image
if(result?.data?.status ==200)
{
    router.push('/dashboard/products')
}



    useEffect(() => {
        const use = async () => {
          (await import('tw-elements')).default;
            };
            use();
          }, []);
    return(<div className="flex w-full justify-between">
        {/* Image */}
        <div className="w-1/2">
         
           <div className="relative w-full h-96">
                  <Image src={image}  fill objectFit="contain" priority  alt="No Image"/>
            </div>
            {/* sub image */}
            <div className="flex w-full">
                <Link className="w-1/2 bg-sky-800 rounded-md py-1 text-white text-center mx-2" href={`/dashboard/products/edit/${product?.id}`} >Edit</Link>
                <button onClick={()=>{destroyProduct({id:product?.id})}} className="w-1/2 bg-red-800 rounded-md py-1 text-white text-center mx-2" >Delete</button>
            
            </div>


        </div>
        {/* Info */}
        <div className="w-1/2">
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
            href="#pills-details"
            className="my-2 block rounded bg-neutral-100 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="pills-details-tab"
            data-te-toggle="pill"
            data-te-target="#pills-details"
            role="tab"
            aria-controls="pills-details"
            aria-selected="false"
            >Product Details</a>
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
      <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          data-te-tab-active>
           <div className="flex w-full flex-col">

            <div className="flex text-sky-900 items-center"> <span > Title :</span><h1 className="text-xl my-2 mx-3">   {product?.product_title}</h1></div>

            <h3 className="text-sky-900 text-md my-2">Category : <span className="px-4 py-1 bg-sky-900 text-white rounded-md">{product?.category_title}</span> </h3>
            <h4 className="text-sky-900 my-2">Status : <span className="px-4 py-1 bg-sky-900 text-white rounded-md"> {product?.status ?'Visible':'Hidden'}</span></h4>
            <div className=" text-sky-900"> <span >Description :</span> <p className="text-sky-800 w-full "> {product?.product_description}</p></div>



          </div>
       </div>
       <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-details"
          role="tabpanel"
          aria-labelledby="pills-details-tab"
         >
            <div className="flex flex-col">
            <h3 className="text-sky-900 text-md my-2">Quantity : <span className="px-4 py-1 bg-sky-900 text-white rounded-md">{product?.quantity}</span> </h3>
            <h3 className="text-sky-900 text-md my-2">Color : <span className="px-4 py-1 bg-sky-900 text-white rounded-md">{product?.color}</span> </h3>
            <h3 className="text-sky-900 text-md my-2">Price : <span className="px-4 py-1 bg-sky-900 text-white rounded-md">{product?.product_price}</span> </h3>

            </div>
            
            </div>
            <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab">
            <div className="flex text-sky-900 items-center"> <span >Meta Title :</span>  <h1 className="text-xl my-2 mx-3">   {product?.product_meta_title}</h1></div>

           
            <div className=" text-sky-900"> <span >Meta Description :</span> <p className="text-sky-800 w-full "> {product?.product_meta_description}</p></div>

          </div>
        </div>


        
    </div>)
}



export default ProductCard