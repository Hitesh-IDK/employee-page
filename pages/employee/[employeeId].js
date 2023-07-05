import { useRouter } from "next/router";
import emplyCss from '../../styles/employee.module.css';
import { useEffect, useState } from "react";

const EmployeeData = () => {
    const router = useRouter();
    const [reqData, setReqData] = useState({});
    const employeeId = Object.hasOwn(router, 'query') ? router.query.employeeId : null;

    useEffect(() => {
        requestData();
    }, []);

    const requestData = async () => {
        const response = await fetch('https://employee-data-31b57-default-rtdb.asia-southeast1.firebasedatabase.app/employee.json');
        const data = await response.json();

        console.log(data);

        for (const key in data) {
            if (data[key].name.toLowerCase() === employeeId.toLowerCase()) {
                console.log('Found!');
            }
        }
    }



    return (
        <div className={emplyCss.main__container} >
            <div className={emplyCss.sub__container}>
                <h1>{ }</h1>
                <label>Salary</label>
                <p></p>
            </div>
        </div>
    );
}

export default EmployeeData;