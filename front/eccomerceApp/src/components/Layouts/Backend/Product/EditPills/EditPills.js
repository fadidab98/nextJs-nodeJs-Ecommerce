import { useAddProductMutation, useGetProductSingleQuery, useUpdateProductMutation } from '@/store/dataApi/dashboard/productApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select'



const EditPills =(props)=>{
  const router = useRouter()
  const [updateProduct , result] = useUpdateProductMutation(props.data)

  const {data:product} = useGetProductSingleQuery(props.data);
  const product1 = product?.data[0]
  const colorA = product1?.color.split(",").map(u=>{
    return {value:u,label:u}});

  useEffect(() => {
    const use = async () => {
            (await import('tw-elements')).default;
        };
        use();
      }, []);
      const [inputs,setInputs] = useState({
        //1
        title:'',  //2
        metaTitle:'',   //3
        descrip:'',    //4
        metaDescrip:'',
        //5
        quantity:'',
        price:'',
        status:'',
         categoryId:'',
        //9
        color:[],
        //10
        
        //11

      })

      const InputHandler =(e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value})
      }
    useEffect(()=>{
        
        setInputs({
            title:product1?.product_title,  //2
            metaTitle:product1?.product_meta_title,   //3
            descrip:product1?.product_description,    //4
            metaDescrip:product1?.product_meta_description,
            //5
            quantity:product1?.quantity,
            price:product1?.product_price,
            status:product1?.status,
            color:colorA,
            categoryId:product1?.category_id,
            id:props.data

        })
    },[product])
      console.log('input',inputs)


      const optionList = [
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "blue", label: "Blue" },
        { value: "white", label: "White" }
      ];

      function handleSelect(data) {
        setInputs({...inputs,color:data})
      }


       const submitHandler=(e)=>{
        e.preventDefault();
        updateProduct(inputs);


       }

       if(result.data?.status == 200)
       {
        router.push('/dashboard/products')
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
            href="#pills-images"
            className="my-2 block rounded bg-neutral-100 px-7 pt-4 pb-3.5 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
            id="pills-images-tab"
            data-te-toggle="pill"
            data-te-target="#pills-images"
            role="tab"
            aria-controls="pills-images"
            aria-selected="false"
            >Product Images</a>
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
         {/* data */}
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          data-te-tab-active>
       
           

            <div className="px-4">
            <div className="flex flex-col my-2">
                {/* category name */}
                <input id="categoryName" value={inputs.title} onChange={InputHandler} name='title' type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product Name"/>
            </div>

            <div className="flex flex-col my-2">
                {/* category name */}
                <textarea id="categoryDescription" rows={'8'} value={inputs.descrip} onChange={InputHandler} name='descrip' type="text" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product Description"></textarea>
            </div>
            <div className="flex flex-col">

                  <div className="mb-3 w-full">
                      <select id="categoryStatus" value={inputs.categoryId} onChange={InputHandler} name='categoryId' className="bg-gray-100 text-gray-500 border-2 p-2 focus:outline-2 focus:outline-sky-400 w-full" placeholder="Category">
                      <option className="p-4" value="1"> mobile</option>
                      <option value="2">computer</option>
                    
                      </select>
                  </div>
              </div>


              <div className="flex flex-col">

                  <div className="mb-3 w-full">
                      <select id="categoryStatus" value={inputs.status} onChange={InputHandler} name='status' className="bg-gray-100 text-gray-500 border-2 p-2 focus:outline-2 focus:outline-sky-400 w-full" placeholder="Status">
                      <option className="p-4" value="0"> Hidden</option>
                      <option value="1">Visible</option>
                    
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
            <div className="flex flex-col my-2">
                {/* category quantity */}
                <input id="categoryName" value={inputs.quantity} onChange={InputHandler} name='quantity' type="number" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Quantity"/>
            </div>
            <div className="flex flex-col my-2">
                {/* category quantity */}
                <input id="categoryName" value={inputs.price} onChange={InputHandler} name='price' type="number" step={'0.01'} className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product Price"/>
            </div>
            <div className="flex ">
              <div className='flex w-full items-center'>
                <label className='text-sm text-gray-600 mr-5'>Product Color :</label>
                <Select
                className='w-60'
                    options={optionList}
                    placeholder="Select color"
                    value={inputs.color}
                    onChange={handleSelect}
                    isMulti
                  />
              </div>
            </div>

            </div>
          </div>
            {/* details End */}
            {/* Images */}
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-images"
          role="tabpanel"
          aria-labelledby="pills-images-tab">
           <div className="px-4">
            <div className="flex flex-col my-2">
                {/* category name */}
                <input id="categoryName" name='product_image'  type="file" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product Main Image"/>
            </div>

            <div className="flex flex-col my-2">
                {/* category name */}
                <input id="categoryName" name='category_sub_image'  type="file" multiple className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product sub Image"/>
            </div>

            </div>
           
            
        </div>
         {/* Images END*/}

        {/* SEO  */}
        <div
          className="hidden opacity-0 opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab">
           <div className="px-4">
            <div className="flex flex-col my-2">
                {/* category name */}
                <input id="categoryName" type="text" name="metaTitle" value={inputs.metaTitle} onChange={InputHandler} className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product SEO Name"/>
            </div>

            <div className="flex flex-col my-2">
                {/* category name */}
                <textarea id="categoryDescription" rows={'8'} type="text" value={inputs.metaDescrip} onChange={InputHandler} name="metaDescrip" className="bg-gray-100 border-2 p-2 focus:outline-2 focus:outline-sky-400" placeholder="Product SEO  Description"></textarea>
            </div>

            </div>
            <div className="w-full text-center">
            <button onClick={submitHandler} className="p-3 bg-sky-800 rounded-md m-auto text-white">Save</button>
            </div>
            
        </div>
        {/* SEO END */}
  
      </form></>)
}

export default EditPills