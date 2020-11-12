import React from 'react';

const ImageUpload = ({selectImageHandler, uploadImage, imageToUpload, fileInput}) => {

    return (
        <div>
            <input type="file" className="form-control-file" id="fileUpload" accept="image/*"
                   key={fileInput}
                   onChange={e => {
                       selectImageHandler(e)
                   }}/>
            {imageToUpload ? (
                <button type="button" className="btn btn-light" onClick={uploadImage}>
                    Upload your file
                </button>
            ) : null}
        </div>
    );
};

export default ImageUpload;
