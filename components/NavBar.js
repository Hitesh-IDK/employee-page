import Link from 'next/link';
import navCss from './NavBar.module.css';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import PageContext from '@/contexts/page-context';
export default function NavBar(props) {
    const page = props.page;

    const { data: session } = useSession();
    const pageCtx = useContext(PageContext);
    const pageId = pageCtx.pageId;

    const homeCss = `${navCss.element} ${pageId === 'home' ? navCss.active_element : ''}`;
    const searchCss = `${navCss.element} ${pageId === 'search' ? navCss.active_element : ''}`;
    const addEmplyCss = `${navCss.element} ${pageId === 'addEmply' ? navCss.active_element : ''}`;

    return (
        <>
            <nav className={navCss.navBar}>
                <ul className={navCss.navStrip}>
                    <Link href='/'><li className={homeCss}>Home</li></Link>
                    <Link href='/employee'><li className={searchCss}>Search</li></Link>
                    <Link href='/employee/add'><li className={addEmplyCss}>Add Employee</li></Link >
                </ul>
                {!session && <Link href='/auth'><div className={navCss.auth}>Login</div></Link>}
                {session && <Link href='/profile'><div className={navCss.auth}>Profile</div></Link>}
            </nav>
        </>
    );
}