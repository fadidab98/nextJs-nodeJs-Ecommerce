import Image from "next/image";
import Link from "next/link";
import styles from "../../../../../styles/Front/Footer.module.css"
import Logo from '../../../../../public/uploads/mainImage/Logo.svg';
import { Nunito } from '@next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  })
export default function Footer() {
  return (
    <footer className=" bg-white p-5 w-full h-auto text-white">
        
        <div className="h-full w-full  bg-sky-800  rounded-t-lg  px-14 pt-4">
            <div className={"flex justify-between items-center flex-wrap "+styles.socialmedia}>
                <h2 className={"text-white text-lg text-medium " + nunito.className}>Social Network :</h2>
                <div className="flex p-4">
                    <h2 className="mx-1">Facebook</h2>
                    <h2 className="mx-1">Instagram</h2>
                    <h2 className="mx-1">Youtube</h2>
                    <h2 className="mx-1">LinkedIn</h2>
                </div>

            </div>
            <div className={"h-5/6 w-full  bg-sky-800  rounded-t-lg  flex justify-between  flex-wrap py-4 "+styles.socialmedia}>
            <div className={"w-48 m-3 "+ styles.footerCol}>
                <div className="flex items-center items-center justify-center  "><Image src={Logo} priority={'true'} width={'40'} height={'40'} alt="No Image Logo" /> <h2 className={"pl-4 text-xl font-semibold  "+nunito.className}>Shopify</h2></div>
                <p className="p-3 text-left">Enim minim enim minim labore est esse ex tempor. Lorem ipsum eiusmod qui nostrud commodo commodo deserunt. Qui reprehenderit consequat velit in proident pariatur nulla quis consequat duis minim sint magna.</p>
            </div>
            <div className={"w-48 m-3 "+ styles.footerCol}>
            <div className="flex items-center items-center justify-center"><h2 className={"text-xl font-semibold  "+nunito.className}>Category</h2></div>

            <ul >
                    <li className={nunito.className + 'text-sm font-medium  '}>Computer</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>Mobile</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>Camera</li>
                </ul>
            </div>
            <div className={"w-48 m-3 "+ styles.footerCol}>
            <div className="flex items-center items-center justify-center"><h2 className={"text-xl font-semibold  "+nunito.className}>Useful Links </h2></div>

            <ul>
                 <li className={nunito.className + 'text-sm font-medium  '}>pricing</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>Settings</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>Orders</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>Help</li>
                </ul>
            </div>
            <div className={"w-48 m-3 "+ styles.footerCol}>
            <div className="flex items-center items-center justify-center"><h2 className={"text-xl font-semibold  "+nunito.className}>Contact</h2></div>

            <ul>
                 <li className={nunito.className + 'text-sm font-medium  '}>mobile</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>address</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>email</li>
                 <li className={nunito.className + 'text-sm font-medium  '}>fax</li>
                </ul>
            </div>

            </div>

        </div>
        <div className="bg-sky-900  text-center text-white rounded-b-lg "> &copy; Copyright: <Link href="/gmail">Fadi Dabboura</Link></div>

    </footer>
  )
}
