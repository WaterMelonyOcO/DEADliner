import './style.scss';

export function AboutCard (props) {
    return <div className='aboutCard__wrapper'>
        <div className='aboutCard__wrapper__spans'>
            <span className='aboutCard__wrapper__text'>
                <h3 className='aboutCard__title'>
                    {props.title}
                </h3>
                <p className='aboutCard__subtitle'>
                    {props.subtitle}
                </p>
            </span>
            <span className='aboutCard__wrapper__icons'>
                <a href={props.link1} className='aboutCard__wrapper__link style1'></a>
                <a href={props.link2} className='aboutCard__wrapper__link style2'></a>
                <a href={props.link3} className='aboutCard__wrapper__link style3'></a>
            </span>
        </div>
        
        <p className='aboutCard__text'>
            "{props.quote}"
        </p>
    </div>
}