import React from "react";
import styles from "./Header.module.scss";
import { Link, useMatch } from "react-router-dom";

const Header = () => {
    return (
        <header className="py-3">
            <div className="row">
                <div className="col-2">
                    <Link to='/'>
                        <img src="../../../static/frontend/logo.svg" height={55}></img>
                    </Link>
                </div>
                <div className="col-6 justify-content-center d-flex">
                    <ul className="nav nav-pills">
                        <li className="nav-item"><Link to='/' className={[styles.nav_link, 'nav-link' , useMatch('/')?styles.nav_link_active:''].join(' ')}>Выбор задачи</Link></li>
                        <li className="nav-item"><Link to='/input' className={[styles.nav_link, 'nav-link' , useMatch('/input')?styles.nav_link_active:''].join(' ')}>Исходные данные</Link></li>
                        <li className="nav-item"><Link to='/validation' className={[styles.nav_link,'nav-link' , useMatch('/validation')?styles.nav_link_active:''].join(' ')}>Проверка</Link></li>
                        <li className="nav-item"><Link to='/calculating' className={[styles.nav_link , 'nav-link',useMatch('/calculating')?styles.nav_link_active:''].join(' ')}>Рассчёт</Link></li>
                    </ul>
                </div>
                <div className="col-6"></div>
            </div>
            
        </header>
    );
}

export default Header;