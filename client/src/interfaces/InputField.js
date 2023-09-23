import '../sass/modules.sass'

const InputField = ({ title, placeholder, oc, required }) => 
{
    return(
        <div className='InputField-module'>
            <div className='InputField-module--title'>
                { title ? title : 'Input' }
            </div>
            <input className='InputField-module--input'
                required={ required }
                placeholder={ placeholder ? placeholder : 'Type something...' }
                onChange={ oc } />
        </div>
    )
}

export default InputField