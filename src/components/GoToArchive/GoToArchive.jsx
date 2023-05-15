import style from './style.scss';

export function GoToArchive (props) {
    const NumberOfComplete = props.NumberOfComplete;
    return (<div className='wrapper'>
        <h4 className='wrapper__text'>
        Вау, никогда не видел <span>таких</span> маленьких цифр. Ты смог выполнить 1 заданий.  
        </h4>
    </div>)
}