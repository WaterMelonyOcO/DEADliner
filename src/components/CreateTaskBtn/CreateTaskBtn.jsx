import style from './style.scss';
import icon_plus from '../../images/button-plus.png';
import { CreateNewTaskWindow } from '../CreateNewTaskWindow/CreateNewTaskWindow';
import { useState } from 'react';

export function CreateTaskBtn() {
    /*тут функция onClick должна вызывать модальное окно 
    с формой заполнения таски */
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
      };

    return(<button onClick={toggleModal} className='wrapper__btn'>
        { showModal && 
            <CreateNewTaskWindow onClose={toggleModal}>
                {/* <h1>Заголовок модального окна</h1>
                <p>Текст модального окна</p> */}
            </CreateNewTaskWindow>
        }
        <img src={icon_plus} alt="icon"/>
    </button>)
}