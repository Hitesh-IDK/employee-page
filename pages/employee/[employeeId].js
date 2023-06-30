import { useRouter } from "next/router";

const EmployeeData = () => {
    const router = useRouter();
    const employeeId = Object.hasOwn(router, 'query') ? router.query.employeeId : null; 
    
    console.log(employeeId);
}

export default EmployeeData;