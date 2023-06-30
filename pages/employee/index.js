import Head from 'next/head';
import Image from 'next/image';
import searchImg from '../../public/searchImg.png';
import emplyIndexCss from '../../styles/employeeIndex.module.css';

export default function employeeIndex() {
    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Interface to connect to the database of employee data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <div className={emplyIndexCss.title_container}>
                    <div className={[emplyIndexCss.title]} >employee . data</div>
                    <Image src={searchImg} alt='Search image' className={emplyIndexCss.search_img} />
                </div>

                <div className={emplyIndexCss.search_container}>
                    <div className={emplyIndexCss.search_bar}>
                        <input className={emplyIndexCss.search_input}/>
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