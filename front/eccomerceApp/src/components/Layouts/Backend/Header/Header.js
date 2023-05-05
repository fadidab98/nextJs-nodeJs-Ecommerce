

const Header =(props)=>{
    return(
        <nav className="w-full rounded-md bg-gray-100 px-5">
        <ol className="list-reset flex">
          <li>
            <a
              href="#"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >{props?.father}</a>
          </li>
          <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
          </li>
          <li>
            <a
              href="#"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >{props?.child}</a>
          </li>
         {/*  <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
          </li>
          <li className="text-neutral-500 dark:text-neutral-400">Data</li> */}
        </ol>
      </nav>
    );

}

export default Header;