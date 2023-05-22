import style from './style.scss';
import { Link } from 'react-router-dom';


/*определить, приходит ли вместе с текстом путь,
 и если да, отрисовать другую кнопку */
export function RedBtn (props) {
    const path = props.path;
    const outline = props.outline;

    if (path) {
        return <RedBtnPath path={props.path} text={props.text}/>;
    } if (outline) {
        return <RedBtnOutline text={props.text} outline={props.outline} />;
    } else {
        return <RedBtnText text={props.text}/>;
    }

}

function RedBtnText (props) {
    return (
        <button className='button'>
             <p className='button__text'>{props.text}</p>
         </button>
    )
}

function RedBtnPath (props) {
    // console.log(props)
    return (
        <Link to={props.path} className='button'>
             <p className='button__text'>{props.text}</p>
         </Link>
    )
}

function RedBtnOutline (props) {
    return (
        <button className='button-outline'>
             <p className='button-outline__text'>{props.text}</p>
         </button>
    )
}