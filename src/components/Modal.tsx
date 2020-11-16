import React from 'react';

interface Props {
    imageForView: string | null,
    selectImageForView: (e:any ,link: null) => void
}

const Modal: React.FC<Props> = ({imageForView, selectImageForView}) => {
    return (
        <div className="backdrop" onClick={(e) => selectImageForView(e, null)}>
            {imageForView ? <img src={imageForView} alt="fullImg"/> : null}
        </div>
    );
};

export default Modal;
