import React, {Fragment} from 'react';

const ImageUpload = ({uploadFile, setImageToUpload, imageToUpload}) => {

    return (
        <Fragment>
            <input type="file" className="form-control-file" id="fileUpload"
                   onChange={e => {
                       setImageToUpload(e.target.files[0])
                   }}/>
            {imageToUpload ? (
                <button type="button" className="btn btn-light" onClick={uploadFile}>
                    Upload your file
                </button>
            ) : null}
        </Fragment>
    );
};

export default ImageUpload;
