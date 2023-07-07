import NavBar from "@/components/NavBar";
import Head from "next/head";
import addCss from '../../styles/add.module.css';
import InputCard from "@/components/InputCard";
import { useState } from "react";
import ToolTip from "@/components/ToolTip";
import { resolve } from "styled-jsx/css";

export default function add() {

    const [validName, setValidName] = useState(true);
    const [validSalary, setValidSalary] = useState(true);

    const [inputName, setInputName] = useState('');
    const [inputSalary, setInputSalary] = useState('');
    const [inputDate, setInputDate] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        let valid = true;

        if (inputName.trim().length === 0) {
            setValidName(false);
            valid = false;
        }

        if (inputSalary <= 0 || inputSalary >= 1000000000) {
            setValidSalary(false);
            valid = false;
        }

        if (!valid) {
            return;
        }

        const validDate = inputDate === '' ? new Date().toISOString().slice(0, 10) : inputDate;

        const inputData = {
            name: inputName,
            salary: inputSalary,
            hiredOn: validDate,
            entryDate: new Date()
        };

        await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify({ destination: 'hybrid', data: { ...inputData }}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        // await fetch('https://employee-data-31b57-default-rtdb.asia-southeast1.firebasedatabase.app/employee.json', {
        //     method: 'POST',
        //     body: JSON.stringify(inputData),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        // });

        setInputName('');
        setInputDate('');
        setInputSalary('');
    }

    const nameHandler = (event) => {
        setValidName(true);
        setInputName(event.target.value);
    }

    const salaryHandler = (event) => {
        setValidSalary(true);
        setInputSalary(event.target.value.trim());
    }

    const dateHandler = (event) => {
        setInputDate(event.target.value);
    }

    return (
        <>
            <Head>
                <title>Add Employee</title>
                <meta name="description" content="add an employee to the database" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavBar page='addEmply' />

            <div className={addCss.add__container}>
                <div className={addCss.card}>
                    <h1 className={addCss.add_title}>Employee Data</h1>
                    <form onSubmit={submitHandler} className={addCss.form__container}>
                        <label className={addCss.labelStyle}>Name</label>
                        <InputCard><input onChange={nameHandler} value={inputName} className={addCss.input_name} /></InputCard>
                        {!validName && <ToolTip content='Invalid Name!' />}
                        <label className={addCss.labelStyle}>Salary</label>
                        <InputCard><input type="number" onChange={salaryHandler} value={inputSalary} className={addCss.input_number} /></InputCard>
                        {!validSalary && <ToolTip content='Invalid Salary!' />}
                        <label className={addCss.labelStyle}>Hired On</label>
                        <InputCard><input type="date" onChange={dateHandler} value={inputDate} className={addCss.input_date} /></InputCard>
                        <button type="submit" className={addCss.submit} >Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}