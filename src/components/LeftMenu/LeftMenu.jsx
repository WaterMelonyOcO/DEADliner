import style from './style.scss';
import logo from '../../images/logo.png';
import main_icon from '../../images/main_page.svg';
import archive_icon from '../../images/archive.svg';
import info_icon from '../../images/info.svg';
import error_icon from '../../images/error.svg';
import main_icon_red from '../../images/main_page_hover.svg';
import archive_icon_red from '../../images/arch_red.svg';
import info_icon_red from '../../images/info_red.svg';
import error_icon_red from '../../images/err_red.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function LeftMenu () {

    /* для красных иконок */
    const [isSelected, setIsSelected] = useState(false);
    const handleClick = () => {
        setIsSelected(!isSelected);
      }

    return(<>
        <div className="head">
            <img src={logo} alt="logo" className="head__logo"/>

            <nav className='head__nav'>
                <a onClick={handleClick} href='#' className='head__link'>
                    <span className='head__span head__span_active'>
                        <img src={ isSelected ? main_icon_red : main_icon} alt="icon" className='head__span__img'/>
                        Главная
                    </span>
                </a>

                <a onClick={handleClick} href='#' className='head__link'>
                    <span className='head__span'>
                        <img src={isSelected ? archive_icon_red : archive_icon} alt="icon" className='head__span__img'/>
                        Архив
                    </span>
                </a>

                <a onClick={handleClick} href='#' className='head__link'>
                    <span className='head__span'>
                        <img src={isSelected ? info_icon_red : info_icon} alt="icon" className='head__span__img'/>
                        О разработчиках
                    </span>
                </a>

                <a onClick={handleClick} href='#' className='head__link'>
                    <span className='head__span'>
                        <img src={isSelected ? error_icon_red : error_icon} alt="icon" className='head__span__img'/>
                        Сообщить об ошибке
                    </span>
                </a>
            </nav>

            {/* <ul className="head__ul">
                <li><Link to=""><img src={main_icon} alt="main_icon"/>Главная</Link></li>
                <li><Link to=""><img src={archive_icon} alt="arch_icon"/>Архив</Link></li>
                <li><Link to=""><img src={info_icon} alt="info_icon"/>О разработчиках</Link></li>
                <li><Link to=""><img src={error_icon} alt="error_icon"/>Сообщить об ошибке</Link></li>
            </ul> */}
            <p className="head__version__p">
            version 0.0.1
            </p>
        </div>
    </>)
}