import Image from "next/image";
import styles from "../../../../../styles/Front/Home/HomeCategory.module.css";
import computer from '../../../../../public/uploads/mainImage/computer.jpg'
import mobile from '../../../../../public/uploads/mainImage/mobile.jpg'
import camera from '../../../../../public/uploads/mainImage/camera.jpg'
import Link from "next/link";
import { Nunito } from '@next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  })

function HomeCategory() {
  return (
    <div className={styles.motherdiv + " flex flex-col"}>

        <div className={styles.category + " flex items-center justify-center h-80 m-3"}>
            <Image src={computer} priority  width={'420'} height={'auto'} alt="No Image Computer"/>
            <div className={"text-white flex flex-col h-full w-2/4 text-center  " + nunito.className }>
                <h2 className="text-2xl">Computer</h2>
                <p className="py-6">Do laborum nostrud dolore dolore consequat proident veniam ad cupidatat ea veniam aliqua aliqua anim. Aliquip sint excepteur aliquip pariatur. Adipisicing commodo sint eiusmod eu est exercitation. Id ex laboris do ea dolor qui.</p>
                <Link href='/explore' className="text-sky-900 bg-white px-4 py-1 w-36  m-auto rounded-full">Explore</Link>

                </div>
        </div>
        <div className={styles.category + " flex items-center justify-center h-80 m-3 "}>
            <Image src={mobile} priority  width={'420'} height={'auto'} alt="No Image Mobile" />
            <div className={"text-white flex flex-col h-full w-2/4 text-center  " + nunito.className }>
            <h2 className="text-2xl">Mobile</h2>
            <p className="py-6">Do laborum nostrud dolore dolore consequat proident veniam ad cupidatat ea veniam aliqua aliqua anim. Aliquip sint excepteur aliquip pariatur. Adipisicing commodo sint eiusmod eu est exercitation. Id ex laboris do ea dolor qui.</p>
                <Link href='/explore' className="text-sky-900 bg-white px-4 py-1 w-36  m-auto rounded-full">Explore</Link>
                </div>

        </div>
            <div className={styles.category + " flex items-center justify-center h-80 m-3"}>
                <Image src={camera} priority  width={'420'} height={'auto'} alt="No Image Camera"/>
                <div className={"text-white flex flex-col h-full w-2/4 text-center " + nunito.className }>
                <h2 className="text-2xl">Camera</h2>
                <p className="py-6">Do laborum nostrud dolore dolore consequat proident veniam ad cupidatat ea veniam aliqua aliqua anim. Aliquip sint excepteur aliquip pariatur. Adipisicing commodo sint eiusmod eu est exercitation. Id ex laboris do ea dolor qui.</p>
                <Link href='/explore' className="text-sky-900 bg-white px-4 py-1 w-36  m-auto rounded-full">Explore</Link>

    
                </div>

            </div>
        
    </div>
  )
}

export default HomeCategory