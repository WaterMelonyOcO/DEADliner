import style from './style.scss';
import logo from '../../images/logo_deadliner.svg';
import main_icon from '../../images/main_page.svg';
import archive_icon from '../../images/archive.svg';
import info_icon from '../../images/info.svg';
import error_icon from '../../images/error.svg';

export function LeftMenu () {
    return(<>
        <div className="head">
            <img src={logo} alt="logo" />

            <ul className="head__ul">
                <li><img src={main_icon} alt="main_icon"/>Главная</li>
                <li><img src={archive_icon} alt="arch_icon"/>Архив</li>
                <li><img src={info_icon} alt="info_icon"/>О разработчиках</li>
                <li><img src={error_icon} alt="error_icon"/>Сообщить об ошибке</li>
            </ul>
            <p className="head__version_p">
            version 0.0.1
            </p>
        </div>
    </>)
}