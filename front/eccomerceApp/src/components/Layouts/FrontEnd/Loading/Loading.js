import GuestLayout from "../GuestLayout";
import Image from 'next/image';
import loadinImage from '../../../../../public/Loading.svg'
const Loading =(props)=>{
    return <div className={`bgLoading  flex justify-center text-white  ${props.loading?" ":'hidden'}`}>
        <div className="relative w-full h-full  flex justify-center items-center ">
        <Image src={loadinImage} priority alt='No Image'/>

        </div>
  </div>
}
export default Loading;