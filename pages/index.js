import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import searchImg from '../public/searchImg.png';
import homeCss from '../styles/homepage.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Interface to connect to the database of employee data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className={homeCss.title_container}>
          <div className={[homeCss.title]} >employee . data</div>
          <Link href='./employee'><Image src={searchImg} alt='Search image' className={homeCss.search_img} /></Link>
        </div>
        <div className={homeCss.stats_container}>
          <div className={homeCss.stats_each__container}><div className={homeCss.stats__count}>Employee Count</div><div >50</div></div>
          <div className={homeCss.stats_each__container}><div className={homeCss.stats__query}>Total Queries</div><div >399</div></div>
          <div className={homeCss.stats_each__container}><div className={homeCss.stats__amount}>Amount Paid</div><div >39008$</div></div>
        </div>
      </div>

    </>
  )
}