import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import style from './Nav.module.scss';
import { CiSearch } from "react-icons/ci";

export const Nav = () => {

    return(
        <>
            <nav className={style.nav}>
                <div className={style.firstDiv}>
                    <hgroup>
                        <h3>HomeLands</h3>
                    </hgroup>
                    <ul>
                        <li><Link to="/pages/">Forside</Link></li>
                        <li><Link to="/pages/Boliger">Boliger til salg</Link></li>
                        <li><Link to="/pages/Login">Log in</Link></li>
                        <div className={style.secondDiv}>
                            <input type="text" name="" id="" />
                            <span>
                                <CiSearch />
                            </span>
                           
                        </div>
                        
                    </ul>
                    
                </div>
            </nav>

        </>
    )
}