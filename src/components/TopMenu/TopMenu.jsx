import style from './style.scss';
import job_icon from '../../images/job_icon.png';
import study_icon from '../../images/study_icon.png';
import home_icon from '../../images/home_icon.png';
import new_tag from '../../images/new_tag_icon.png';
import { TagsList } from '../TagsList/TagsList';
import { FiltersList } from '../FiltersList/FiltersList';

export function TopMenu () {
    const options = [
        { value: 'работа', label: 'Работа', image: job_icon},
        { value: 'учеба', label: 'Учеба', image: study_icon },
        { value: 'дом', label: 'Дом', image: home_icon},
        { value: 'новый тег', label: 'Новый тег', image: new_tag}
      ];
      const options2 = [
        { value: 'Время на исходе', label: 'Время на исходе'},
        { value: 'Время еще есть', label: 'Время еще есть'},
        { value: 'Недавно добавленные', label: 'Недавно добавленные'},
        { value: 'Давно добавленные', label: 'Давно добавленные'}
      ]
    return <div className='search'>
            <input type='search' name="search_input" className='input__search' placeholder='Поиск'/>
            <TagsList placeholder="Теги" options={options}/>
            <FiltersList placeholder="Фильтры" options={options2}/>

    </div>
}