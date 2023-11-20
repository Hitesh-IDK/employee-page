import { getSession, signOut, useSession } from 'next-auth/react';
import profCss from '../styles/profile.module.css';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { getServerSession } from 'next-auth';
import Loading from '@/components/ui/Loading';
import InputCard from '@/components/InputCard';
import PageContext from '@/contexts/page-context';
import NotificationContext from '@/contexts/notif-context';
import Head from 'next/head';

export default function Profile(props) {
    const [isChanging, setIsChanging] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { showNotification } = useContext(NotificationContext);
    const pageCtx = useContext(PageContext);

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();

    const { data: session } = useSession();
    const email = props.email;

    const router = useRouter();

    const homeHandler = () => {
        router.push('/');
    }

    const changeHandler = () => {
        setIsChanging(true);
    }

    const logoutHandler = () => {
        setIsLoading(true);
        signOut();

        const notification = {
            content: 'Logging you out!',
            status: 'success'
        }

        showNotification(notification);
    }

    const passwordHandler = async () => {

        setIsLoading(true);

        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;

        const response = await fetch('/api/auth/change-password', {
            method: 'PATCH',
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            })
        });

        const data = await response.json();
        if (!response.ok) {
            const notification = {
                content: data.message,
                status: 'error'
            }

            showNotification(notification);
        }
        else {
            const notification = {
                content: data.message,
                status: 'success'
            }

            showNotification(notification);
            setIsChanging(false);
        }

        setIsLoading(false);

    }

    const cancelHandler = () => {
        setIsChanging(false);
    }

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
        else {
            setIsLoading(false);
            pageCtx.setPageContext('');
        }

    }, [])

    if (isLoading)
        return (
            <>
                <Head>
                    <title>Profile</title>
                    <meta name="description" content="User Profile for employee data" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className={profCss.load_container}>
                    <Loading context='Making changes...' />
                </div>
            </>
        );

    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="description" content="User Profile for employee data" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={profCss.main__container}>
                <div className={profCss.sub__container}>
                    <h1 className={profCss.title}>Profile</h1>
                    {session ? (
                        <>
                            <label className={profCss.labels}>Email</label>
                            <p className={profCss.data}>{email}</p>
                        </>
                    ) : (
                        <p className={profCss.labels}>
                            Error
                        </p>
                    )}
                    <button onClick={homeHandler} className={profCss.home}>
                        Home
                    </button>
                    {isChanging ? (
                        <>
                            <label className={profCss.passwords}>Old Password</label>
                            <InputCard isInvalid={false} ><input type='password' ref={oldPasswordRef} className={profCss.inputs}></input></InputCard>
                            <label className={profCss.passwords}>New Password</label>
                            <InputCard isInvalid={false}><input type='password' ref={newPasswordRef} className={profCss.inputs}></input></InputCard>
                            <div className={profCss.change_container}>
                                <button onClick={passwordHandler} className={profCss.confirm}>Confirm</button>
                                <button onClick={cancelHandler} className={profCss.cancel}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <button onClick={changeHandler} className={profCss.change}>Change Password</button>
                    )}
                    <button onClick={logoutHandler} className={profCss.logout}>Logout</button>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = JSON.parse(JSON.stringify(await getServerSession(context.req, context.res)));

    if (!session) {
        console.log(session);
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const email = session.user.email;

    return {
        props: {
            email: email
        }
    }
}