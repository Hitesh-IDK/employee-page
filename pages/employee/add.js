import Head from "next/head";
import addCss from '../../styles/add.module.css';
import InputCard from "@/components/InputCard";
import { useEffect, useState } from "react";
import ToolTip from "@/components/ToolTip";
import { useContext } from "react";
import PageContext from "@/contexts/page-context";
import NotificationContext from "@/contexts/notif-context";

export default function Add() {
    const [isNameValid, setIsNameValid] = useState(true);
    const [isSalaryValid, setIsSalaryValid] = useState(true);
    const [inputName, setInputName] = useState('');
    const [inputSalary, setInputSalary] = useState('');
    const [inputDate, setInputDate] = useState('');
    const pageCtx = useContext(PageContext);
    const { showNotification } = useContext(NotificationContext);

    const validateForm = () => {
        let isValid = true;

        if (inputName.trim().length === 0) {
            setIsNameValid(false);
            isValid = false;
        }

        if (inputSalary <= 0 || inputSalary >= 1000000000) {
            setIsSalaryValid(false);
            isValid = false;
        }

        return isValid;
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const validDate = inputDate === '' ? new Date().toISOString().slice(0, 10) : inputDate;

        const inputData = {
            name: inputName,
            salary: inputSalary,
            hiredOn: validDate,
            entryDate: new Date()
        };

        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                body: JSON.stringify({ destination: 'hybrid', data: { ...inputData } }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (response.ok) {
                setInputName('');
                setInputDate('');
                setInputSalary('');

                const notification = {
                    content: 'Employee Added Successfully!',
                    status: 'success'
                }

                showNotification(notification);
            } else {
                // Handle server-side errors or other non-successful responses
                const notification = {
                    content: 'Error on the server!',
                    status: 'error'
                }

                showNotification(notification);
            }
        } catch (error) {
            // Handle network errors
        }
    };

    const nameHandler = (event) => {
        setIsNameValid(true);
        setInputName(event.target.value);
    };

    const salaryHandler = (event) => {
        setIsSalaryValid(true);
        setInputSalary(event.target.value.trim());
    };

    const dateHandler = (event) => {
        setInputDate(event.target.value);
    };

    useEffect(() => {
        pageCtx.setPageContext('addEmply');
    }, []);

    return (
        <>
            <Head>
                <title>Add Employee</title>
                <meta name="description" content="add an employee to the database" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={addCss.add__container}>
                <div className={addCss.card}>
                    <h1 className={addCss.add_title}>Employee Data</h1>
                    <form onSubmit={submitHandler} className={addCss.form__container}>
                        <label className={addCss.labelStyle}>Name</label>
                        <InputCard>
                            <input onChange={nameHandler} value={inputName} className={addCss.input_name} />
                        </InputCard>
                        {!isNameValid && <ToolTip content='Invalid Name!' />}
                        <label className={addCss.labelStyle}>Salary</label>
                        <InputCard>
                            <input type="number" onChange={salaryHandler} value={inputSalary} className={addCss.input_number} />
                        </InputCard>
                        {!isSalaryValid && <ToolTip content='Invalid Salary!' />}
                        <label className={addCss.labelStyle}>Hired On</label>
                        <InputCard>
                            <input type="date" onChange={dateHandler} value={inputDate} className={addCss.input_date} />
                        </InputCard>
                        <button type="submit" className={addCss.submit} >Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}