import React from 'react';
import {Alert} from 'antd';

interface Props {
    successMessage: string | null,
    errorMessage: string | null
}

const Message: React.FC<Props> = ({successMessage, errorMessage}) => {
    let button = null;
    if (successMessage) {
        button = <Alert message={successMessage} type="success" showIcon/>
    } else if (errorMessage) {
        button = <Alert message={errorMessage} type="error" showIcon/>
    } else {
        return null
    }

    return (
        <div className="message-area">
            {button}
        </div>
    );
};

export default Message;
