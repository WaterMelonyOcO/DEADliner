import style from './style.scss';
import search_icon from '../../images/search_icon.svg';

export function TopMenu () {
    return <div className='search'>
        <label for="search_input" className='input__search__label'>
            <input type='search' name="search_input" className='input__search' placeholder='Поиск'/>
            {/* <img src={search_icon} alt='search_icon' className='input__search__img'/> */}
        </label>
    </div>
}