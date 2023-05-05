import Image from "next/image"
import header from "../../../../../public/uploads/mainImage/computer1.jpg";
import styles from '../../../../../styles/Front/Home/HeaderStyle.module.css';
import Link from "next/link";
function Header() {
  return (
    <div className="relative w-100 ">
      <div className={"relative  " + styles.header }>
          <Image src={header} layout={'fill'}   objectFit="cover" quality={90}     alt="No Image Header" priority={true} />
          <div className={styles.headerText}>
            <div className={styles.headerTextDiv + ' text-white rounded-t-md'}>
                <div className="px-4 pt-4 md:mt-4   z-10">
                <h1 className="text-2xl">In Lorem est proident Lorem occaecat ex pariatur </h1>
                <p className="text-sm my-2 md:my-6">Ex ea labore minim duis. Consectetur aliquip consequat dolore et proident mollit do cillum esse anim consectetur ipsum nulla. Adipisicing laborum deserunt commodo enim. Voluptate ex qui officia est deserunt pariatur sint culpa nulla ullamco aliquip sunt cillum. Sint sunt amet sunt deserunt duis ad velit eu irure. </p>
               <div className="w-full text-center m-4"> <Link href="/submit" className="bg-sky-500 text-white rounded-md px-5 py-1 mt-2 md:m-auto">Submit</Link>
               </div>
                </div>
            </div>          
          </div>
        </div>
    </div>
  )
}

export default Header