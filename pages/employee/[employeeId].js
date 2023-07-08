import { useRouter } from 'next/router';
import emplyCss from '../../styles/employee.module.css';
import { buildDataPath, extractData } from '../api/data';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';

const EmployeeData = (props) => {
    const router = useRouter();
    const [dataExists, setDataExists] = useState();
    const [deleted, setDeleted] = useState(false);

    const data = props.data;

    useEffect(() => {
        if (!data) {
            setDataExists(false);
        }
        else {
            setDataExists(true);
        }
    }, [data])

    const homeHandler = () => {
        router.push('/');
    }

    const deleteHandler = async () => {
        // const reqData = JSON.stringify(data);
        // console.log(reqData);

        const response = await fetch(`/api/${data.name.toLowerCase()}`, {
            method: 'DELETE'
        })

        if (response.status === 200) {

            setDeleted(true);
        }
    }

    return (
        <>
            <NavBar />
            <div className={emplyCss.main__container}>
                <div className={emplyCss.sub__container}>
                    <h1 className={emplyCss.title}>Employee Data</h1>
                    {dataExists && !deleted ? (
                        <>
                            <label className={emplyCss.labels}>Name</label>
                            <p className={emplyCss.data}>{data.name}</p>
                            <label className={emplyCss.labels}>Salary</label>
                            <p className={emplyCss.data}>{data.salary}</p>
                            <label className={emplyCss.labels}>Hired On</label>
                            <p className={emplyCss.data}>{data.hiredOn}</p>
                        </>
                    ) : (
                        <p className={emplyCss.labels}>
                            {deleted ? "Deleted employee data successfully!" : "Data not found!"}
                        </p>
                    )}
                    <button onClick={homeHandler} className={emplyCss.home}>
                        Home
                    </button>
                    {dataExists && !deleted && (
                        <button onClick={deleteHandler} className={emplyCss.delete}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default EmployeeData;

export async function getServerSideProps(context) {
    const { params } = context;

    const filePath = buildDataPath();
    const data = extractData(filePath);

    for (const i in data) {
        if (data[i].name.toLowerCase() === params.employeeId) {
            return {
                props: {
                    params: params,
                    data: data[i]
                }
            }
        }
    }

    return {
        props: {
            params: params
        }
    };
}