import Head from 'next/head';
import Image from 'next/image';
import searchImg from '../../public/searchImg.png';
import emplyIndexCss from '../../styles/employeeIndex.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Stats from '../../components/stats/stats';
import { extractData } from '../api/data';
import { connectToDatabase } from '@/helpers/auth/auth-db';
import PageContext from '@/contexts/page-context';

export default function employeeIndex(props) {
    const [emplyInput, setEmplyInput] = useState('');
    const router = useRouter();
    const pageCtx = useContext(PageContext);

    const inputHandler = (event) => {
        setEmplyInput(event.target.value);
    }

    const enterHandler = async (event) => {
        if (event.key === 'Enter') {
            router.push(`/employee/${emplyInput.trim().toLowerCase()}`);
        }
    }

    useEffect(() => {
        pageCtx.setPageContext('search');
    }, []);

    return (
        <>
            <Head>
                <title>Employee Data</title>
                <meta name="description" content="Interface to connect to the database of employee data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <div className={emplyIndexCss.title_container}>
                    <h1 className={[emplyIndexCss.title]} >employee . data</h1>
                    <Image src={searchImg} alt='Search image' className={emplyIndexCss.search_img} />
                </div>

                <div className={emplyIndexCss.search_container}>
                    <div className={emplyIndexCss.search_bar}>
                        <input value={emplyInput} onChange={inputHandler} onKeyUp={enterHandler} className={emplyIndexCss.search_input} />
                    </div>
                </div>

                <Stats data={props} />
            </div>

        </>
    )
}

export async function getServerSideProps(context) {

    let client;
    try {
        client = await connectToDatabase();
    }
    catch (error) {
        console.log('Client error');
        return {
            props: {
                emplyCount: ' - ',
                queryCount: ' - '
            }
        }
    }

    try {
        const data = await extractData('', 'remote');
        let count = 0;
        for (const i in data)
            count++;

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

    catch (error) {
        client.close();
        console.log('parse error');
        return {
            props: {
                emplyCount: ' - ',
                queryCount: ' - '
            }
        }
    }
}