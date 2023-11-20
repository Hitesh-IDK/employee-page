import statCss from './stats.module.css';
import emplyCountImg from '@/public/images/employee-count.png'
import queryCountImg from '@/public/images/query-count.png';
import salaryImg from '@/public/images/salary.png';
import Image from 'next/image';

export default function Stats(props) {
    const data = props.data;
    return (
        <div className={statCss.stats_container}>
            <div className={statCss.stats_each__container}>
                <Image src={emplyCountImg} className={statCss.images} alt='Employee Count image' priority={true} />
                <label className={statCss.stats__count}>Employee Count</label>
                <div className={statCss.stats_values}>{data.emplyCount}</div>
            </div>
            <div className={statCss.stats_each__container}>
                <Image src={queryCountImg} className={statCss.images} alt='Query Count image' priority={true} />
                <label className={statCss.stats__query}>Total Queries</label>
                <div className={statCss.stats_values} >{data.queryCount}</div>
            </div>
            <div className={statCss.stats_each__container}>
                <Image src={salaryImg} className={statCss.images} alt='Salary image' priority={true} />
                <label className={statCss.stats__amount}>Amount Paid</label>
                <div className={statCss.stats_values}>39008$</div>
            </div>
        </div>
    );
}