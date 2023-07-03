import React from 'react'

const Image = (props) => {
    return (
        <img alt='' width={props.width && props.width} className={props.class && props.class} src={props.url}></img>
    )
}

export default Image