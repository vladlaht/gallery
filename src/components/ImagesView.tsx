import React from 'react';

interface Props {
    uploadedImages: Array<string>,
    selectImageForView: (e: any, link:string) => void,
}

const ImagesView: React.FC<Props> = ({uploadedImages, selectImageForView}) => {
    return (
        <div className="gallery">
            {uploadedImages && uploadedImages.map((item, index) => (
                <img key={index}
                     onClick={(e) => selectImageForView(e, item)}
                     src={item}
                     alt=""/>
            ))}
        </div>
    );
};

export default ImagesView;
