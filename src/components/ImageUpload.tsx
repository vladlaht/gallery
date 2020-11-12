import React, {useRef} from 'react';
import {SearchOutlined, CloudUploadOutlined} from "@ant-design/icons";

interface Props {
    selectImageHandler: (e: any) => void,
    uploadImage: () => void,
    imageToUpload: any,
    fileKey: null | string
}

const ImageUpload: React.FC<Props> = ({selectImageHandler, uploadImage, imageToUpload, fileKey}) => {
    const fileUpload = useRef<HTMLInputElement>(null);

    const clickHandler = () => {
        const fileUploadExist = fileUpload.current;
        if (fileUploadExist) {
            fileUploadExist.click();
        }
    };

    return (
        <>
            <div className="buttons-container">
                <input type="file" accept="image/png, image/jpeg"
                       key={fileKey}
                       ref={fileUpload}
                       style={{display: 'none'}}
                       onChange={e => {
                           selectImageHandler(e)
                       }}/>
                <button className="buttons-container-item" type="button" onClick={clickHandler}>
                    <SearchOutlined className="buttons-container-item__search-icon"/> <span
                    className="buttons-container-item__text">Select image</span>
                </button>
            </div>

            {imageToUpload ? (
                <button className="buttons-container-item" type="button" onClick={uploadImage}>
                    <CloudUploadOutlined className="buttons-container-item__search-icon"/> <span
                    className="buttons-container-item__text">Upload your file</span>
                </button>
            ) : null}
        </>
    );
};

export default ImageUpload;