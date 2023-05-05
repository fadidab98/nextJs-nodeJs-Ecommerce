import {  useFilterProductMutation  } from '@/store/dataApi/productApi';
import { changeBrandButton, changeColorButton, changePriceButton } from '@/store/settingSlice';
import React, { useState } from 'react'
import {HiPlus,HiMinus} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
function Filter(props) {
    const colorButton = useSelector(state=>state.setting.setting.filterButtonColor);
    const priceButton = useSelector(state=>state.setting.setting.filterButtonPrice);
    const brandButton = useSelector(state=>state.setting.setting.filterButtonBrand)
        const dispatch = useDispatch();
        const [color,setColor] = useState([]);
        const [price,setPrice] = useState([]);
        const [brand,setBrand] = useState([]);
        const filterProduct = props.filterProduct
        function arrayRemove(arr, value) { 
    
            return arr.filter(function(ele){ 
                return ele != value; 
            });
        }
        const inputsColorHandler=(e)=>{
           
           if(color.indexOf(e.target.value) ===-1)
           {
            setColor([...color,e.target.value])
           }else{
          
            setColor(arrayRemove(color,e.target.value))  

           }
        }
        const inputsPriceHandler=(e)=>{

            if(price.indexOf(e.target.value) ===-1)
            {
                setPrice([...price,e.target.value])
            }else{
                setPrice(arrayRemove(price,e.target.value))
            }
                        
         }
         const inputsBrandHandler=(e)=>{
            if(brand.indexOf(e.target.value) ===-1)
            {
                setBrand([...brand,e.target.value])
            }else{
                setBrand(arrayRemove(brand,e.target.value))
            }
            
         }
    const submitFilter =(e)=>{
        e.preventDefault();
        const data = {color:color,price:price,brand:brand}
        filterProduct({color:color,price:price,brand:brand})
    

     

    }
 
    console.log(price)
      
  return (
    <>
    {/* Filter */}
    <div className='w-full border-b-2 border-sky-600 '>
     <h2 className='text-2xl text-sky-900 pl-2'>Filter</h2>
    </div>
    <form>
    <div className='w-full mt-2 p-2 bg-gray-100 ' >
        <div className='flex justify-between  '>
        <h2>Color</h2>
        <span className='p-1' onClick={()=>dispatch(changeColorButton(colorButton))}>{colorButton?<HiMinus/>:<HiPlus/>}  </span>
        </div>
        <ul className={`flex flex-col border-t-2 border-gray-200  duration-200 ${colorButton?'':'hidden'}`}>
            <li className='ml-1 mt-1'>
                
                <input id="color1" type={'checkbox'} name="color[]" value="black" onChange={inputsColorHandler}/>
                <label className='pl-1' htmlFor='color1'>Black</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="color2" type={'checkbox'} name="color[]" value="white" onChange={inputsColorHandler}/>
                <label className='pl-1' htmlFor='color2'>White</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="color3" type={'checkbox'} name="color[]" value="green" onChange={inputsColorHandler}/>
                <label className='pl-1' htmlFor='color3'>Green</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="color4" type={'checkbox'} name="color[]" value="red" onChange={inputsColorHandler}/>
                <label className='pl-1' htmlFor='color4'>Red</label>
            </li>
        </ul>
  
    </div>
    <div className='w-full mt-2 p-2 bg-gray-100 ' >
        <div className='flex justify-between  '>
        <h2>Price</h2>
        <span className='p-1' onClick={()=>dispatch(changePriceButton(priceButton))}>{priceButton?<HiMinus/>:<HiPlus/>}  </span>
        </div>
        <ul className={`flex flex-col border-t-2 border-gray-200  duration-200 ${priceButton?'':'hidden'}`}>
            <li className='ml-1 mt-1'>
                
                <input id="price1" type={'checkbox'} name="price[]" value="100-500" onChange={inputsPriceHandler}/>
                <label className='pl-1' htmlFor='price1' >100 - 500</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="price2" type={'checkbox'} name="price[]" value="500-1000" onChange={inputsPriceHandler}/>
                <label className='pl-1'  htmlFor='price2' >500 - 1000</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="price3" type={'checkbox'} name="price[]" value="1000-1100" onChange={inputsPriceHandler}/>
                <label className='pl-1'  htmlFor='price3' >1000-1100</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="price4" type={'checkbox'}  name="price[]" value="1100-1500" onChange={inputsPriceHandler}/>
                <label className='pl-1'  htmlFor='price4'>1100 -1500</label>
            </li>
        </ul>
  
    </div> <div className='w-full mt-2 p-2 bg-gray-100 ' >
        <div className='flex justify-between  '>
        <h2>Brand </h2>
        <span className='p-1' onClick={()=>dispatch(changeBrandButton(brandButton))}>{brandButton?<HiMinus/>:<HiPlus/>}  </span>
        </div>
        <ul className={`flex flex-col border-t-2 border-gray-200  duration-200 ${brandButton?'':'hidden'}`}>
            <li className='ml-1 mt-1'>
                
                <input id="brand1" type={'checkbox'} name="brand[]" value="samsung" onChange={inputsBrandHandler}/>
                <label className='pl-1' htmlFor='brand1'>Samsung</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="brand2" type={'checkbox'} name="brand[]" value="apple" onChange={inputsBrandHandler}/>
                <label className='pl-1' htmlFor='brand2'>Apple</label>
            </li>
            <li className='ml-1  mt-1'>
                
                <input id="brand3" type={'checkbox'} name="brand[]" value="huawei" onChange={inputsBrandHandler}/>
                <label className='pl-1' htmlFor='brand3'>Huawei</label>
            </li>
            
        </ul>
  
    </div> 
    <button onClick={submitFilter} className='w-full outline  outline-2 outline-sky-800 rounded-md mt-5 p-2 text-sky-900 hover:bg-sky-800 hover:text-white' >Filter</button>
    </form>
     
  </>
  )
}

export default Filter