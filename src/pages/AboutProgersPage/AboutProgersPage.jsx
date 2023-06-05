import { AboutCard } from '../../components/AboutCard/AboutCard';
import './style.scss';

export function AboutProgersPage () {
    return <section className='section__about'>

        <h2 className='section__about__title'>
            Вот они - люди, которые воплотили мемную идею в жизнь:
        </h2>

        <div className='section__about__wrapperCards' >
            <AboutCard title="Влад Москвитин" subtitle="Идея, бэкенд" quote="Какая-то прикольная цитата?"
            link1="vk.com" link2="vk.com" link3="vk.com"></AboutCard>
            <AboutCard title="Софья Маркер" subtitle="Дизайн, фронтенд" quote="привет" link1="vk.com" link2="vk.com" link3="vk.com"></AboutCard>
        </div>

        <div className='section__about__wrapperBtns'>
            {/* ссылка на github*/}
            <a href="/#" className='section__about__btn'>
                Посмотреть проект на github
            </a>
        {/* ссылка на онлайн-кошелек*/}
            <a href="/#" className='section__about__btn'>
                На развитие проекта
            </a>
        </div>
    </section>
}