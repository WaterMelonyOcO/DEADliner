import './style.scss';
import icon_plus from '../../images/button-plus.png';
import { CreateNewWindowComponent } from '../CreateNewWindowComponent/CreateNewWindowComponent';
import { useState } from 'react';
import { RedBtn } from '../RedBtn/RedBtn';
// import todo from '../../preload';

export function CreateTaskBtn() {
    /*тут функция onClick должна вызывать модальное окно 
    с формой заполнения таски */
    const [modalActive, setModalActive] = useState(false);
    
    /*оставить код на будущее */
    // const createTaskBtn = document.querySelector("#createTaskBtn");
    // createTaskBtn.addEventListener('click', () => {
    //     let name = document.getElementById("#name");
    //     let description = document.getElementById("#description");
    //     let time = document.getElementById("#deadline");
    //     let files = document.getElementById("#files");

    //     let timeVal = time.value.split("T").join(" ");

    //     //  let cr = todo.add(name.value, description.value, time.value, null, files);
    //     // if (cr) console.log("ev")

    //    // console.log(`name: ${name}, desc: ${description}, deadline: ${deadline_time}, files: ${files} `)
    // })
    
    /*тут код для кнопки списка с тегами */
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedOptions([...selectedOptions, selectedOption]);
    }
    const renderSelectedOptions = () => {
        if (selectedOptions.length === 0) {
            return <p>No options selected</p>
        } else {
            return (<ul>
                {selectedOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>)
        }
    }
    return(
    
    <>
    <button className='wrapper__btn' onClick={() => setModalActive(true)}>
        <img src={icon_plus} alt="icon"/>
    </button>

     <CreateNewWindowComponent active={modalActive} setActive={setModalActive} title="Создание задания">
     <form className="modal__body" id="createTask">
             <span className='modal__body__wrapper'>
             <label className='modal__body__label' htmlFor="name"> Название</label>
                 <input type='text' className='modal__body__input' name="name" id="name" placeholder='Введи название задания'/>
             </span>
             <span className='modal__body__wrapper'>
             <label className='modal__body__label' htmlFor="description">Описание</label>
             <textarea className='modal__body__textarea' name="description" id="description" placeholder="Введи описание задания (не более 300 символов)"></textarea>
             </span>

             <span className='modal__body__wrapper'>
             <label className='modal__body__label' htmlFor="deadline">Дата завершения</label>
             <input type="date" className='modal__body__input small__input' name="deadline" id="deadline"/>
             </span>

        {/*тут кастомное вложение */}
             <span className='modal__body__wrapper file__wrapper'>
             <p className='modal__body__label'>Вложение</p>
             <label className='modal__body__input small__input file__body' htmlFor='files_input'>Добавить файл</label>
                 <input type='file' 
                 name="files" 
                 id="files_input"
                 className='file'/>
             </span>

        {/*кнопка "добавить тег"*/}
        <div>
            <select onChange={handleOptionChange}>
                <option value="" selected disabled hidden>
                    Select an option
                </option>
                

                <option value="tag1">
                    Tag 1
                </option>
                <option value="tag2">
                    Tag 2
                </option>
                <option value="tag3">
                    Tag 3
                </option>
            </select>
            {renderSelectedOptions()}
        </div>

             <span className='modal__body wrapper_btns'>
             <RedBtn text="Отменить создание" outline="outline" onClick={() => setModalActive(false)}/>
             <RedBtn text="Создать задание" id="createTaskBtn" />
             </span>      

         </form>
     </CreateNewWindowComponent>
    
     </> )
}