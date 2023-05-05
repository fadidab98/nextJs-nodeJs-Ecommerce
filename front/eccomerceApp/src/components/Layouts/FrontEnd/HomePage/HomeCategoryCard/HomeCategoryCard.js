import React from 'react'
import Image from 'next/image'
function HomeCategoryCard() {
  return (
   <>
       <div className={styles.category + " flex items-center justify-center h-80 m-3"}>
            <Image src={'/'} layout="fill" objectFit="cover"  alt="No Image Computer"/>
            <div className={"text-white flex flex-col h-full w-2/4 text-center  " + nunito.className }>
                <h2 className="text-2xl">Computer</h2>
                <p className="py-6">Do laborum nostrud dolore dolore consequat proident veniam ad cupidatat ea veniam aliqua aliqua anim. Aliquip sint excepteur aliquip pariatur. Adipisicing commodo sint eiusmod eu est exercitation. Id ex laboris do ea dolor qui.</p>
                <Link href='/explore' className="text-sky-900 bg-white px-4 py-1 w-36  m-auto rounded-full">Explore</Link>

                </div>
        </div>
   </>
  )
}

export default HomeCategoryCard