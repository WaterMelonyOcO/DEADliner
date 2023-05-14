import style from './style.scss';
import logo from '../../images/logo_deadliner.svg';
import main_icon from '../../images/main_page.svg';
import archive_icon from '../../images/archive.svg';
import info_icon from '../../images/info.svg';
import error_icon from '../../images/error.svg';
import { Link } from 'react-router-dom';

export function LeftMenu () {
    return(<>
        <div className="head">
            <img src={logo} alt="logo" className="head__logo"/>

            <ul className="head__ul">
                <li><Link to=""><img src={main_icon} alt="main_icon"/>Главная</Link></li>
                <li><Link to=""><img src={archive_icon} alt="arch_icon"/>Архив</Link></li>
                <li><Link to=""><img src={info_icon} alt="info_icon"/>О разработчиках</Link></li>
                <li><Link to=""><img src={error_icon} alt="error_icon"/>Сообщить об ошибке</Link></li>
            </ul>
            <p className="head__version_p">
            version 0.0.1
            </p>
        </div>
    </>)
}