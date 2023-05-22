/* eslint-disable no-undef */
import './style.scss';

export function CreateNewTaskWindow ({active, setActive, children, title}) {

    return (
        <div className={active ? "modal__overlay active" : "modal__overlay"} >
            <div className="modal__dialog">
                <div className="modal__content">
                <div className="modal__header">
                    <h1 className='modal__header__title'>{title}</h1>
                    <button className="modal__close" onClick={() => console.log("hhhh")}>
                    </button>
                </div>
                    
                </div>
                {children}
            </div>
    </div>
    )
}