import svg_box from '../img/icons/box.svg'

const IntroSectionCard = ({ img, title, info }) =>
{
    return(
        <div className='Intro-section--grid--card'>
            <img className='Intro-section--grid--card--img'
                src={ img ? img : svg_box }
                alt='Card'/>
            <div className='Intro-section--grid--card--title'>
                { title ? title : 'Title' }
            </div>
            <div className='Intro-section--grid--card--info'>
                { info ? info : 'Here is some info on this card The info will be displayed here and only here.' }
            </div>
        </div>
    )
}

export default IntroSectionCard