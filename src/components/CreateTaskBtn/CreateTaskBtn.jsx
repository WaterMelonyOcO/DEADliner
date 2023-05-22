import style from './style.scss';
import icon_plus from '../../images/button-plus.png';
import { CreateNewTaskWindow } from '../CreateNewTaskWindow/CreateNewTaskWindow';
import { useState } from 'react';

export function CreateTaskBtn() {
    /*тут функция onClick должна вызывать модальное окно 
    с формой заполнения таски */
    const [modalActive, setModalActive] = useState(false);
    
    return(<button className='wrapper__btn' onClick={() => setModalActive(true)}>
         
            <CreateNewTaskWindow active={modalActive} setActive={setModalActive}>
                {/* <h1>Заголовок модального окна</h1>
                <p>Текст модального окна</p> */}
            </CreateNewTaskWindow>
 
        <img src={icon_plus} alt="icon"/>
    </button>)
}