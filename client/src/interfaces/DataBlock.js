const DataBlock = ({ hide, name, data, valueColor }) =>
{
    return(
        <div className='DataBlock--module'
            style={ hide ? {display: 'none'} : {} }>
            <div>{ name }</div>
            <div 
                style={valueColor ? {color: valueColor} : {}}>
                { data }
            </div>
        </div>
    )
}

export default DataBlock