import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import searchImg from '../public/searchImg.png';
import homeCss from '../styles/homepage.module.css';
import NavBar from '@/components/NavBar';
import { useContext, useEffect, useState } from 'react';
import Stats from '@/components/stats/stats';
import PageContext from '@/contexts/page-context';
// import { extractData } from './api/data';
// import { connectToDatabase } from '@/helpers/auth/auth-db';

export default function Home(props) {

  const [homeData, setHomeData] = useState({ emplyCount: 0, queryCount: 0 });
  const [queryCount, setQueryCount] = useState(0);
  const [emplyCount, setEmplyCount] = useState(0);
  const pageCtx = useContext(PageContext);

  const getHomeData = async () => {
    try {
      const response = await fetch('/api/home-data');
      const resData = await response.json();
      const data = resData.data;

      const homeData = {
        emplyCount: data.emplyCount,
        queryCount: data.queryCount
      }

      setHomeData(homeData);
    }
    catch (error) {
      const homeData = {
        emplyCount: ' - ',
        queryCount: ' - '
      }
      setHomeData(homeData);
    }
  }

  const startCounter = async () => {
    let query = homeData.queryCount;
    let employee = homeData.emplyCount;

    console.log('Starting Counter');

    while (query !== 0 || employee !== 0) {
      console.log('Looping');
      if (query > 0) {
        console.log(query + ' Query');
        setQueryCount((prevCount) => {
          return prevCount++;
        })
        query--;
      }

      if (employee > 0) {
        console.log(employee + ' Employee');
        setEmplyCount((prevCount) => {
          return prevCount++;
        })
        employee--;
      }
    }
  }

  useEffect(() => {
    getHomeData();
    // startCounter();

    pageCtx.setPageContext('home');
  }, []);

  return (
    <>
      <Head>
        <title>Employee Data</title>
        <meta name="description" content="Interface to connect to the database of employee data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={homeCss.title_container}>
        <h1 className={[homeCss.title]} >employee . data</h1>
        <Link href='./employee'><Image src={searchImg} alt='Search image' className={homeCss.search_img} /></Link>
      </div>

      <Stats data={homeData} />
    </>
  )
}

// export async function getServerSideProps(context) {

  // let client;
  // try {
  //   client = await connectToDatabase();
  // }
  // catch (error) {
  //   return {
  //     props: {
  //       emplyCount: ' - ',
  //       queryCount: ' - '
  //     }
  //   }
  // }

  // try {
  //   const data = await extractData('', 'remote');
  //   let count = 0;
  //   for (const i in data)
  //     count++;

  //   const queries = client.db().collection('queries');
  //   const queryData = await queries.find().toArray();

  //   let queryCount = 0;

  //   if (queryData) {
  //     for (const i in queryData) {
  //       queryCount += queryData[i].queryCount;
  //     }
  //   }

  //   client.close();
  //   return {
  //     props: {
  //       emplyCount: count,
  //       queryCount
  //     }
  //   }
  // }

  // catch (error) {
  //   client.close();
  //   return {
  //     props: {
  //       emplyCount: ' - ',
  //       queryCount: ' - '
  //     }
  //   }
  // }
// }
