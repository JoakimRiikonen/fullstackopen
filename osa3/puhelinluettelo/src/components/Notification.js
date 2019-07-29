import React from 'react'

const Notification = ({message, isError}) => {

    const style = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if(isError) {
        style.color = 'red'
    }

    if(message === null){
        return null
    }

    return(
        <div className="notification" style={style}>
            {message}
        </div>
    )
}

export default Notification