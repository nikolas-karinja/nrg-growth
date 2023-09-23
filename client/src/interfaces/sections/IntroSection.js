import svg_affordable from '../../img/icons/affordable.svg'
import svg_cpu from '../../img/icons/cpu.svg'
import svg_star from '../../img/icons/star.svg'

import IntroSectionCard from '../IntroSectionCard'

const IntroSection = () =>
{
    return(
        <div className='Intro-section'>
            <div className='Section-module--content'>
                <div className='Intro-section--title'>How does it work?</div>
                <div className='Intro-section--grid'>
                    <IntroSectionCard
                        img={ svg_cpu }
                        title='ADVANCED SOFTWARE'
                        info='Leveraging our software, we organically expand your social media presence by precisely targeting your ideal audience. This means high quality English accounts.' />
                    <IntroSectionCard
                        img={ svg_star }
                        title='HIGH QUALITY'
                        info='Our followers not only exemplify top-notch quality, but we also ensure you get consistent new followers. Your account will never drop in followers again!' />
                    <IntroSectionCard
                        img={ svg_affordable }
                        title='AFFORDABLE'
                        info="Our marketing network delivers cost-effective and organic growth. You're guaranteed to receive exceptional followers for an affordable price." />    
                </div>
            </div>
        </div>
    )
}

export default IntroSection