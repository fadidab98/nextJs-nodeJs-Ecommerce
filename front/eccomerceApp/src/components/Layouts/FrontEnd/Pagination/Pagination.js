import Link from "next/link";
import { useRouter } from "next/router";





 const Pagination=(props)=>{

    const router = useRouter();
    const page = router.query.page ||1
    const links =[]
    for(let i = 1 ; i<= props.data?.totalPage ; i++){
      links.push(<li key={i} className={`rounded-md m-1 text-sky-900 hover:bg-sky-900 hover:text-white ${page == i ?'border-b-2 border-sky-500':''}`}><Link href={`${props.id ?props.id:''}?page=${i}`} className="px-2 py-1">{i}</Link></li>)

    }


    return (<div className="flex justify-center w-full">

       <ul className="flex justify-center w-full ">
     {props.data?.previous.page ==0 ?(
              <li className=" rounded-md  m-1 text-gray-900"><button  className="px-2 " >Pre</button></li>

     ):(
      <li className="rounded-md    m-1 text-sky-900"><Link href={`${props.id ?props.id:''}?page=${props.data?.previous.page}`} className="px-2 py-1" >Pre</Link></li>
      )}
        {links}

        {(props.data?.next.page == props.data?.totalPage +1)?(
        <li className="rounded-md m-1 text-gray-900  hover:text-gray-900 disabled"><button className="px-2 py-1" >Next</button></li>

        ):(
          <li className="rounded-md m-1 text-sky-900 hover:bg-sky-900 hover:text-white "><Link href={`${props.id ?props.id:''}?page=${props.data?.next.page}` }className="px-2 py-1">Next</Link></li>

        )}

      </ul> 

    </div>)
 }


 export default Pagination;