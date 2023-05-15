import style from './style.scss';

export function RedBtn (props) {
    return (
        <>
        <button className='button'>
            <p className='button__text'>{props.text}</p>
        </button>
        </>
    )
}