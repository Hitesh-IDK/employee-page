import Head from 'next/head';
import Image from 'next/image';
import searchImg from '../../public/searchImg.png';
import emplyIndexCss from '../../styles/employeeIndex.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

export default function employeeIndex() {
    const [emplyInput, setEmplyInput] = useState('');
    const router = useRouter();

    const inputHandler = (event) => {
        setEmplyInput(event.target.value);
    }

    const enterHandler = async (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        const response = await fetch('https://employee-data-31b57-default-rtdb.asia-southeast1.firebasedatabase.app/employee.json');
        const data = await response.json();
        console.log(data);

        for(const key in data) {
            console.log(key);
            console.log(data[key].name);
            if(data[key].name.toLowerCase() === emplyInput.toLowerCase()) {
                router.push(`/employee/${emplyInput.trim().toLowerCase()}`);
            }
        }

        
    }

    return (
        <>
            <Head>
                <title>Employee Data</title>
                <meta name="description" content="Interface to connect to the database of employee data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page='search' />

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

                <div className={emplyIndexCss.stats_container}>
                    <div className={emplyIndexCss.stats_each__container}><div className={emplyIndexCss.stats__count}>Employee Count</div><div >50</div></div>
                    <div className={emplyIndexCss.stats_each__container}><div className={emplyIndexCss.stats__query}>Total Queries</div><div >399</div></div>
                    <div className={emplyIndexCss.stats_each__container}><div className={emplyIndexCss.stats__amount}>Amount Paid</div><div >39008$</div></div>
                </div>
            </div>

        </>
    )
}