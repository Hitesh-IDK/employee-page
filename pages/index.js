import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import searchImg from '../public/searchImg.png';
import homeCss from '../styles/homepage.module.css';
import NavBar from '@/components/NavBar';
import Loading from '@/components/ui/Loading';
import { extractData } from './api/data';
import { connectToDatabase } from '@/helpers/auth/auth-db';

export default function Home(props) {

  return (
    <>
      <Head>
        <title>Employee Data</title>
        <meta name="description" content="Interface to connect to the database of employee data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar page='home' />

      <div>
        <div className={homeCss.title_container}>
          <h1 className={[homeCss.title]} >employee . data</h1>
          <Link href='./employee'><Image src={searchImg} alt='Search image' className={homeCss.search_img} /></Link>
        </div>
        <div className={homeCss.stats_container}>
          <div className={homeCss.stats_each__container}><div className={homeCss.stats__count}>Employee Count</div><div >{props.emplyCount}</div></div>
          <div className={homeCss.stats_each__container}><div className={homeCss.stats__query}>Total Queries</div><div >{props.queryCount}</div></div>
          <div className={homeCss.stats_each__container}><div className={homeCss.stats__amount}>Amount Paid</div><div >39008$</div></div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const data = await extractData('', 'remote');
  let count = 0;
  for (const i in data)
    count++;

  const client = await connectToDatabase();
  const queries = client.db().collection('queries');

  const queryData = await queries.find().toArray();

  let queryCount = 0;

  if (queryData) {
    for (const i in queryData) {
      queryCount += queryData[i].queryCount;
    }
  }

  client.close();
  return {
    props: {
      emplyCount: count,
      queryCount
    }
  }
}
