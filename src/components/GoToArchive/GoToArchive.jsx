/* eslint-disable no-undef */

import { RedBtn } from '../RedBtn/RedBtn';
import style from './style.scss';

export function GoToArchive (props) {
    // console.log(getCompTask);
//     return <div className='wrapper'>
//     <h4 className='wrapper__text'>
//     Вау, никогда не видел <span>таких</span> маленьких цифр. Ты смог выполнить<strong>{` ${1} заданий`}</strong>.  
//     </h4>
//     <RedBtn text="Перейти в архив" path="/archive"/>
// </div>
    
    const {compliteTasks} = todo.getCompTask();
    console.log(compliteTasks)

    // const { NumberOfComplete } = props.NumberOfComplete;
 
    switch (true) {
        case (compliteTasks >=0 && compliteTasks <=10) :
            return  <Less10Tasks />;
        case (compliteTasks >=11 && compliteTasks <=20) :
            return <UpTo20Tasks />;
        case (compliteTasks >=21 && compliteTasks <=30) :
            return <UpTo30Tasks />;
        case (compliteTasks >=31 && compliteTasks <=40) :
            return <UpTo40Tasks />;
        default:
        return null;
    }
}

function Less10Tasks () {
    return <div className='wrapper'>
        <h4 className='wrapper__text'>
        Вау, никогда не видел <span>таких</span> маленьких цифр. Ты смог выполнить<strong>{` ${1} заданий`}</strong>.  
        </h4>
        <RedBtn text="Перейти в архив" path="/archive"/>
    </div>
}

function UpTo20Tasks () {
    return <div className='wrapper'>
        <h4 className='wrapper__text'>
         У тебя получилось выполнить<strong>{` ${1} заданий`}</strong>. И это <span className='span_capslock'>все</span>, на что ты способен?   
        </h4>
        <RedBtn text="Перейти в архив" path="/archive"/>
    </div>
} 

function UpTo30Tasks () {
    return <div className='wrapper'>
        <h4 className='wrapper__text'>
        Еще не сдался? <span className='span_capslock'>Жаль.</span> Ты смог выполнить<strong>{` ${1} заданий`}</strong>.  
        </h4>
        <RedBtn text="Перейти в архив" path="/archive"/>
    </div>
}

function UpTo40Tasks () {
    return <div className='wrapper'>
        <h4 className='wrapper__text'>
        <span className='span_capslock'>НЕВЕРОЯТНЫЙ УРОВЕНЬ УДАЧИ.</span> Бог помог тебе выполнить<strong>{` ${1} заданий`}</strong>.  
        </h4>
        <RedBtn text="Перейти в архив" path="/archive"/>
    </div>
}