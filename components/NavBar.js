import Link from 'next/link';
import navCss from './NavBar.module.css';
import { useSession } from 'next-auth/react';

export default function NavBar(props) {
    const page = props.page;

    const {data: session, status} = useSession();

    const homeCss = `${navCss.element} ${page === 'home' ? navCss.active_element : ''}`;
    const searchCss = `${navCss.element} ${page === 'search' ? navCss.active_element : ''}`;
    const addEmplyCss = `${navCss.element} ${page === 'addEmply' ? navCss.active_element : ''}`;

    return (
        <>
            <div className={navCss.navBar}>
                <ul className={navCss.navBar}>
                    <Link href='/'><li className={homeCss}>Home</li></Link>
                    <Link href='/employee'><li className={searchCss}>Search</li></Link>
                    <Link href='/employee/add'><li className={addEmplyCss}>Add Employee</li></Link >
                </ul>
                {!session && <Link href='/auth'><div className={navCss.auth}>Login</div></Link>}
                {session && <Link href='/profile'><div className={navCss.auth}>Profile</div></Link>}
            </div>
        </>
    );
}