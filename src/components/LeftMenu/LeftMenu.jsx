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
    const [selectedLink, setSelectedLink] = useState(0);
    const links = [
        {
          name: "Главная",
          selectedIcon: main_icon_red,
          defaultIcon: main_icon
        },
        {
          name: "Архив",
          selectedIcon: archive_icon_red,
          defaultIcon: archive_icon,
        },
        {
          name: "О разработчиках",
          selectedIcon: info_icon_red,
          defaultIcon: info_icon,
        },
        {
          name: "Сообщить об ошибке",
          selectedIcon: error_icon_red,
          defaultIcon: error_icon,
        },
      ];

      const handleClick = (linkIndex) => {
        setSelectedLink(linkIndex);
      };

    return(<>
        <div className="head">
            <img src={logo} alt="logo" className="head__logo"/>

            <nav className='head__nav'>
                {links.map((link, index) => (
                    <a
                    key={index}
                    className={selectedLink === index ? "head__link_selected" : "head__link"}
                    onClick={() => handleClick(index)}
                    >
                    <img
                        src={
                        selectedLink === index ? link.selectedIcon : link.defaultIcon
                        }
                        alt={link.name}
                        className='head__link__img'
                    />
                    {link.name}
                    </a>
                ))}
            </nav>

            <p className="head__version__p">
            version 0.0.1
            </p>
        </div>
    </>)
}