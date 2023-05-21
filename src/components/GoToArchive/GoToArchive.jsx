import { RedBtn } from '../RedBtn/RedBtn';
import style from './style.scss';

export function GoToArchive (props) {
    // console.log(getCompTask);

    const NumberOfComplete = props.NumberOfComplete;
    return (
        <div className='wrapper'>
        <h4 className='wrapper__text'>
        Вау, никогда не видел <span>таких</span> маленьких цифр. Ты смог выполнить<strong>{` ${1} заданий`}</strong>.  
        </h4>
        <RedBtn text="Перейти в архив" path="/archive"/>
    </div>
        // <LessTenTasks />
    // <div className='wrapper'>
    //      <h4 className='wrapper__text'>
    //     Вау, никогда не видел <span>таких</span> маленьких цифр. Ты смог выполнить 1 заданий.  
    //     </h4> 
    // </div>
    )
}

function LessTenTasks () {
    // return <div className='wrapper'>
    //     <h4 className='wrapper__text'>
    //     Вау, никогда не видел <span>таких</span> маленьких цифр. Ты смог выполнить<strong>{`${1} заданий`} </strong>.  
    //     </h4>
    //     <RedBtn text="Перейти в архив"/>
    // </div>
}