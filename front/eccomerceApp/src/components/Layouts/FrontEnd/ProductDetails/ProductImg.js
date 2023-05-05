import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function ProductImg(props) {
 
  const imgSrc = props?.img;
  const [srcImage,setSrcImage] = useState(imgSrc);

  const defImage = "https://res.cloudinary.com/dg2c3liap/image/upload/v1677996937/mobile_resized_1_egggjw.png";
  const stringToArray = JSON.parse(props.subImage)
  console.log('stringToArray', stringToArray)
   const changeSrcHandler=(img)=>{
    setSrcImage(img)
  }
  console.log(srcImage)
  return (
    <>
      <div className='w-4/5 h-72 relative m-auto'>
      <Image src={srcImage} fill priority objectFit='contain' alt="No Image"/>
      </div>
      <div className='flex justify-center'>
        
      <div className={`h-20 w-14  rounded-lg m-3 relative border-2 border-gray-400 shadow-lg cursor-pointer		${srcImage == imgSrc ?'border-gray-600':''}`}>
             <Image onClick={()=>changeSrcHandler(imgSrc)} src={imgSrc} fill priority objectFit='contain' alt="No Image"/>
       </div>  
        {    stringToArray.map(img=>{
          return <div className={`h-20 w-14  rounded-lg m-3 relative border-2 border-gray-400 shadow-lg cursor-pointer	${srcImage == img ?'border-gray-600':''}`}>
             <Image onClick={()=>changeSrcHandler(img)}  key={Math.random()} src={img} objectFit='contain'  priority fill  alt="No Image"/> 
             </div>
          }) }
        
        
      </div>
      </> )
}

export default ProductImg