import { Nunito } from '@next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    display: 'swap',
  });

function TopProduct() {
    /* Enough Now */

     
  return (
    <div>
        <div className="topProductHeader p-2 bg-sky-900 w-full border-b-2 border-sky-200"><h2 className={" text-white text-2xl "+ nunito.className }>Top Product</h2></div>
        <div className=''>Top Product</div>
    </div>
  )
}

export default TopProduct