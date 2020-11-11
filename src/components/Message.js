import React from 'react';

const Message = ({uploadSuccessMsg, uploadErrorMsg}) => {
    return (
        <div>
            {uploadSuccessMsg ? uploadSuccessMsg : uploadErrorMsg}
        </div>
    );
};

export default Message;
