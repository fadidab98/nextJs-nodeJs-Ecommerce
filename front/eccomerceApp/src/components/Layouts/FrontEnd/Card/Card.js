import { useCountCartQuery, usePostCartMutation} from '@/store/dataApi/cartApi';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Mobile from '../../../../../public/uploads/products/Mobile/mobile.jpg';

function Card(props) {
  const router = useRouter()
const [postCart,error] = usePostCartMutation();
const data = useCountCartQuery();
console.log('cart',data)
if(error?.status == 'rejected')
{

    router.push('/login')
}
console.log('cart',props.data?.product_title,data.data?.data?.map(e=>e.product_id).indexOf(props.data?.id))

  return (
    <div className='w-48 sm:my-5  h-auto bg-gray-100 m-2 rounded-md border-2 shadow-lg'>
      <Link href={'product/'+props.data?.id} className="w-full">
        {/* Image */}
        <div className='image text-center w-full h-52 flex items-center justfy-center  relative'>
            <Image src={props.data?.product_image}  objectFit='contain' fill  priority alt="Image Error"/>
        </div>
        </Link>
        {/* product Name */}
        <div className='text-center'><h2 className='text-xl text-sky-900'>{props.data?.product_title}</h2></div>
        {/* rate */}
        <div className="flex p-1">
            Rates:
        </div>
        {/* {price} */}
        <div className='p-1'> price: {props.data?.product_price}$</div>
        {/* add to cart */}
        <div className='text-center  m-3 w-100 '>
          {data.data?.data?.map(e=>e.product_id).indexOf(props.data?.id) !==-1 && data.data?.data?
                  <button disabled className='bg-red-800 rounded-md  hover:bg-red-900 text-white px-6 py-2 w-full disabled' >In Cart</button>
                  :           <button onClick={()=> {postCart({'product':props.data.id}).then(()=>data.refetch())}} className='bg-sky-800 rounded-md  hover:bg-sky-900 text-white px-6 py-2 w-full'>Add To Cart</button>
                  }

        </div>
        
    </div>

  )
}

export default Card