import Head from "next/head";
import NavBar from "../NavBar";
import Notifications from "../ui/Notifications/Notification";


export default function Layout(props) {
    return (
        <>
            <Head>
                <title>Employee Data</title>
                <meta name="description" content="A web app to interact with the employee database" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <NavBar />
            </header>
            <main>
                <Notifications />
                {props.children}
            </main>
        </>
    );
}