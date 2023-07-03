import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert';

const AlertForm = ({text, property}) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant={property} onClose={() => setShow(false)} style={{width : '100%'}} dismissible>
                <p style={{marginTop: 0, marginBottom: 0}}>{text}</p>
            </Alert>
        )
    }


}

export default AlertForm