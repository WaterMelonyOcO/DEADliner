import './style.scss';
import icon_plus from '../../images/button-plus.png';
import { CreateNewWindowComponent } from '../CreateNewWindowComponent/CreateNewWindowComponent';
import { useState } from 'react';
import { RedBtn } from '../RedBtn/RedBtn';

export function CreateTaskBtn() {
    /*тут функция onClick должна вызывать модальное окно 
    с формой заполнения таски */
    const [modalActive, setModalActive] = useState(false);
    
    return(
    
    <>
    <button className='wrapper__btn' onClick={() => setModalActive(true)}>
        <img src={icon_plus} alt="icon"/>
    </button>

     <CreateNewWindowComponent active={modalActive} setActive={setModalActive} title="Создание задания">
     <form className="modal__body" id="createTask">
             <span className='modal__body__wrapper'>
             <label className='modal__body__label' for="name"> Название</label>
                 <input type='text' className='modal__body__input' name="name" placeholder='Введи название задания'/>
             </span>
             <span className='modal__body__wrapper'>
             <label className='modal__body__label' for="description">Описание</label>
             <textarea className='modal__body__textarea' name="description" placeholder="Введи описание задания (не более 300 символов)"></textarea>
             </span>

             <span className='modal__body__wrapper'>
             <label className='modal__body__label' for="deadline">Дата завершения</label>
             <input type="date" className='modal__body__input small__input' name="deadline"/>
             </span>

        {/*тут кастомное вложение */}
             <span className='modal__body__wrapper file__wrapper'>
             <p className='modal__body__label'>Вложение</p>
             <label className='modal__body__input small__input file__body'>Добавить файл</label>
                 <input type='file' name="files" className='file'/>
             
             </span>
             <span className='modal__body wrapper_btns'>
             <RedBtn text="Отменить задание" outline="outline" onClick={() => setModalActive(false)}/>
             <RedBtn text="Создать задание"/>
             </span>      

         </form>
     </CreateNewWindowComponent>
    
     </> )
}