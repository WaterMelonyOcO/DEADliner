import style from './style.scss';
import { TagsList } from '../TagsList/TagsList';

export function TopMenu () {
    const options = [
        { value: 'работа', label: 'Работа'},
        { value: 'учеба', label: 'Учеба'},
        { value: 'дом', label: 'Дом'},
        { value: 'новый тег', label: 'Новый тег'}
      ];
    return <div className='search'>
            <input type='search' name="search_input" className='input__search' placeholder='Поиск'/>
            <TagsList placeholder="Теги" options={options}/>

    </div>
}