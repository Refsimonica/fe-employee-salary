import React from 'react'

const Button = ({property, icon, onAction, inner, text = 'click', attribute}) => {
    return (
        <button onClick={onAction} {...attribute && attribute} title={text} type="button" className={property}><i className={icon}></i>{inner && inner}</button>
    )
}

export default Button