import '../sass/modules.sass'

import gif_loading from '../img/loading.gif'

const Loading = ({ message }) =>
{
    return(
        <div className='Loading-module'>
            <div className='Loading-module--message'>{ message }</div>
            <img className='Loading-module--img' 
                src={ gif_loading }
                alt='Loading' />
        </div>
    )
}

export default Loading