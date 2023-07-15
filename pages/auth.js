import AuthForm from "@/components/AuthForm";
import { useEffect, useState } from "react";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import Loading from "@/components/ui/Loading";
import authCss from '../styles/auth.module.css'
import { getServerSession } from "next-auth";

export default function Auth() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const [accountExists, setAccountExists] = useState(true);

    useEffect(() => { }, [accountExists]);

    const loginHandler = async (data) => {

        setIsLoading(true);

        const response = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        });

        setIsLoading(false);

        if(!response.ok) {
            setAccountExists(false);
        }
    }

    const signupHandler = async (data) => {

        setIsLoading(true);

        const serverData = JSON.stringify(data);

        const response = await fetch('/api/auth', {
            method: 'POST',
            body: serverData,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setIsLoading(false);

        if (!response.ok) {
            setAccountExists(true);
        }
    }

    if (session) {
        router.replace('/');
    }

    return (
        <div className={authCss.auth_container}>
            {isLoading && <Loading context='Authenticating' />}
            {!isLoading && <AuthForm onLogin={loginHandler} onSignup={signupHandler} accountExists={accountExists} setAccountExists={setAccountExists} />}
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = JSON.parse(JSON.stringify(await getServerSession(context.req, context.res)));

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}