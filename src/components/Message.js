import React from 'react';
import {Alert} from 'antd';

const Message = ({successMessage, errorMessage}) => {
    let button = null;
    if (successMessage) {
        button = <Alert message={successMessage} type="success" showIcon/>
    } else if (errorMessage) {
        button = <Alert message={errorMessage} type="error" showIcon/>
    } else {
        return null
    }

    return (
        <div>
            {button}
        </div>
    );
};

export default Message;
