import React from 'react';

const ImagesView = ({uploadedImages}) => {
    return (
        <div>
            {uploadedImages && uploadedImages.map((item, index) => (
                <img style={{width: "200px", height: "150px"}} key={index} src={item} alt=""/>
            ))}
        </div>
    );
};

export default ImagesView;
