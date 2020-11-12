import React from 'react';

const Info: React.FC = () => {
    return (
        <div className="upload-info">
            <div className="upload-info__text">The following file types can be uploaded:</div>
            <div className="upload-info__types">JPG, JPEG, PNG</div>
        </div>
    );
};

export default Info;
