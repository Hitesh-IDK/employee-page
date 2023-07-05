import Link from 'next/link';
import navCss from './NavBar.module.css';

export default function NavBar(props) {
    const page = props.page;


    return (
        <ul className={navCss.navBar}>
            <Link href='/'><li id='home'>Home</li></Link>
            <Link href='/employee'><li id='search'>Search</li></Link>
            <Link href='/employee/add'><li id='addEmply'>Add Employee</li></Link >
            <style jsx>{`
                #home {
                    background-color: ${page === "home" ? 'rgba(109, 109, 109, 0.664)' : ''};
                    color: ${page == 'home' ? 'white' : ''};
                    padding-right: 2vw;
                    padding-left: 2vw;
                    padding-top: 20px;
                    padding-bottom: 18px;
                    font-size: 120%;
                    border-right: 1px solid rgba(255, 255, 255, 0.342);
                }

                #home:hover {
                    background-color: rgba(240, 248, 255, 0.089);
                    color: white;
                }

                #search {
                    background-color: ${page === "search" ? 'rgba(109, 109, 109, 0.664)' : ''};
                    color: ${page == 'search' ? 'white' : ''};
                    padding-right: 2vw;
                    padding-left: 2vw;
                    padding-top: 20px;
                    padding-bottom: 18px;
                    font-size: 120%;
                    border-right: 1px solid rgba(255, 255, 255, 0.342);
                }

                #search:hover {
                    background-color: rgba(240, 248, 255, 0.089);
                    color: white;
                }

                #addEmply {
                    background-color: ${page === "addEmply" ? 'rgba(109, 109, 109, 0.664)' : ''};
                    color: ${page == 'addEmply' ? 'white' : ''};
                    padding-right: 2vw;
                    padding-left: 2vw;
                    padding-top: 20px;
                    padding-bottom: 18px;
                    font-size: 120%;
                    border-right: 1px solid rgba(255, 255, 255, 0.342);
                }

                #addEmply:hover {
                    background-color: rgba(240, 248, 255, 0.089);
                    color: white;
                }
            `}
            </style>
        </ul>
    );
}