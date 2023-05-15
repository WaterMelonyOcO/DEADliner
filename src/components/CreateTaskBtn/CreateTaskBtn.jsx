import style from './style.scss';
import icon_plus from '../../images/button-plus.png';

export function CreateTaskBtn() {
    /*тут функция onClick должна вызывать модальное окно 
    с формой заполнения таски */
    return(<div className='wrapper__btn'>
        <img src={icon_plus} alt="icon"/>
    </div>)
}