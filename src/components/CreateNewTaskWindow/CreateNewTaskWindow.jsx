import './style.scss';
import { RedBtn } from '../RedBtn/RedBtn';
import plus_icon from '../../images/new_tag_icon.png';

export function CreateNewTaskWindow ({active, setActive}) {
// function fuck () {
//     setActive(false);
//     console.log("CLOSE PLS");
// }
    return (
        <div className={active ? "modal__overlay active" : "modal__overlay"} >
            <div className="modal__dialog">
                <div className="modal__content">
                <div className="modal__header">
                    <h1 className='modal__header__title'>Создание задания</h1>
                    {/* <button className="modal__close" onClick={fuck}>
                    </button> */}
                </div>
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


                    {/* 
                     Добавить тег + 
должен находиться раскрывающийся список
                    <label className='modal__body__label' for="name"> Название</label>
                    <input type='text' className='modal__body__input' name="name"/> */}
            <span className='modal__body wrapper_btns'>
                    <RedBtn text="Отменить задание" outline="outline" onClick={() => setActive(false)}/>
                    <RedBtn text="Создать задание"/>
            </span>      

                </form>
                </div>
            </div>
    </div>
    )
}