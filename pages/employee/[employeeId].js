import { useRouter } from 'next/router';
import emplyCss from '../../styles/employee.module.css';
import { buildDataPath, extractData } from '../api/data';
import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { connectToDatabase } from '@/helpers/auth/auth-db';
import PageContext from '@/contexts/page-context';
import NotificationContext from '@/contexts/notif-context';

const EmployeeData = (props) => {
    const router = useRouter();
    const [dataExists, setDataExists] = useState();
    const [deleted, setDeleted] = useState(false);
    const { data: session } = useSession();
    const pageCtx = useContext(PageContext);
    const { showNotification } = useContext(NotificationContext);

    const data = props.data;

    useEffect(() => {
        if (!data) {
            setDataExists(false);
        }
        else {
            setDataExists(true);
        }

        pageCtx.setPageContext('');
    }, [data])

    const homeHandler = () => {
        router.push('/');
    }

    const deleteHandler = async () => {

        if (!session) {
            const notification = {
                content: 'Login required to delete!',
                status: 'error'
            }

            showNotification(notification);
            return;
        }

        const response = await fetch(`/api/${data.name.toLowerCase()}`, {
            method: 'DELETE'
        })

        if (response.status === 200) {
            setDeleted(true);

            const notification = {
                content: 'Deleted Successfully',
                status: 'success'
            }

            showNotification(notification);
        }
        else {
            const notification = {
                content: 'Something went wrong!',
                status: 'error'
            }

            showNotification(notification);
        }
    }

    return (
        <>
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
    const data = await extractData(filePath, 'remote');

    if (data.error)
        return {
            props: {
                params: params
            }
        }

    for (const i in data) {
        if (data[i].name.toLowerCase() === params.employeeId) {
            const client = await connectToDatabase();
            const queries = client.db().collection('queries');
            let queryPlus;

            const employee = await queries.findOne({ id: i });

            if (employee) {
                queryPlus = employee.queryCount + 1;
                await queries.updateOne({ id: i }, { $set: { name: data[i].name, queryCount: queryPlus } });
            }
            else {
                queryPlus = 1;
                const queryData = {
                    id: i,
                    name: data[i].name,
                    queryCount: queryPlus
                }
                await queries.insertOne(queryData);
            }

            client.close();

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