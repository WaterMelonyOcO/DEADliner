import style from './style.scss';
import { RedBtn } from '../RedBtn/RedBtn';


export function CreateNewTaskWindow ({onClose}) {
    return (
        <div className="modal__overlay">
            <div className="modal__dialog">
                <div className="modal__content">
                <div className="modal__header">
                    <h1 className='modal__header__title'>Создание задания</h1>
                    <span className="modal__close" onClick={onClose}>
                    </span>
                </div>
                <form className="modal__body" id="createTask">
                    <span className='modal__body__wrapper'>
                    <label className='modal__body__label' for="name"> Название</label>
                        <input type='text' className='modal__body__input' name="name" placeholder='Введи название задания'/>
                    </span>
                    <span className='modal__body__wrapper'>
                    <label className='modal__body__label' for="description">Описание</label>
                    <textarea className='modal__body__textarea' name="description"> Введи описание задания (не более 300 символов)</textarea>
                    </span>

                    <span className='modal__body__wrapper'>
                    <label className='modal__body__label' for="deadline">Дата завершения</label>
                    <input type="date" className='modal__body__input small__input' name="deadline"/>
                    </span>

                    <span className='modal__body__wrapper'>
                    <label className='modal__body__label' for="files">Вложение</label>
                    <input type='file' className='modal__body__input small__input' name="files"/>
                    </span>


                    {/* 
                     Добавить тег + 
должен находиться раскрывающийся список
                    <label className='modal__body__label' for="name"> Название</label>
                    <input type='text' className='modal__body__input' name="name"/> */}

                    <RedBtn text="Отменить задание" outline="outline"/>
                    <RedBtn text="Создать задание"/>
                
                </form>
                </div>
            </div>
    </div>
    )
}