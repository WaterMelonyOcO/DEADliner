import style from './style.scss';
import { useEffect, useState } from 'react';
import arrow_icon from '../../images/arrow_icon.svg';

export function TagsList ({placeholder, options}) {
    // console.log(options[3])
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };
    
    
    const getDisplay = () => {
        if (selectedValue) {
            return selectedValue.label;
        }
        return placeholder;
      };

      /* поменять функцию на "Сделать новый тег" */
      function createNewTag() {
        console.log("hello, im 3");
      }
      const onItemClick = (option) => {

        if (option === options[3]) {
            createNewTag();
        } else 
        setSelectedValue(option);
      };
      const isSelected = (option) => {
        if (!selectedValue) return false;
      
      return selectedValue.value === option.value;
    };

    return(
    <div className="dropdown__container">
        <div onClick={handleInputClick} className="dropdown__input">
            <div>{getDisplay()}</div>
            <div>
                <div>
                    <img src={arrow_icon} alt="icon"/>
                </div>
            </div>
        </div>
        {showMenu && (
        <div className='dropdown__menu'>
            {options.map((option) => (
                <div key={option.value} className={`dropdown__item ${isSelected(option) && "selected"}`} onClick={() => onItemClick(option)}>
                    {option.label}
                    <img src={option.image}/>
                    
                    </div>
            ))}
        </div>
        )}
  </div>)
}