import { CreateTaskBtn } from '../CreateTaskBtn/CreateTaskBtn';
import { LeftMenu } from '../LeftMenu/LeftMenu';
import { TopMenu } from '../TopMenu/TopMenu';
import style from './style.scss';

export function Layout () {
    return (<div className="layout"> 
        <LeftMenu/>
        <TopMenu/>
        <CreateTaskBtn />
        
    </div>)
}