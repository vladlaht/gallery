import React, {useState, useEffect} from 'react';
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import ImagesView from "../components/ImagesView";
import Message from "../components/Message";
import Info from "../components/Info";
import Modal from '../components/Modal';

const GalleryContainer: React.FC = () => {

        const [imageToUpload, setImageToUpload] = useState<any>();
        const [uploadedImages, setUploadedImages] = useState<Array<string>>([]);
        const [fileKey, setFileKey] = useState<null | string>(null);
        const [errorMessage, setErrorMessage] = useState<null | string>(null);
        const [successMessage, setSuccessMessage] = useState<null | string>(null);
        const [imageForView, setImageForView] = useState<string | null>(null);
        const reader = new FileReader();

        // Getting all uploaded images
        useEffect(() => {
            axios.get("https://ubhgn4dllg.execute-api.eu-north-1.amazonaws.com/get-images")
                .then(response => {
                    setUploadedImages(response.data.imagesUrlArray);
                })
        });

        // Upload selected and validated image
        const uploadImage = () => {
            axios("https://wwe83vgk2k.execute-api.eu-north-1.amazonaws.com/get-url/getPresignedURL?fileName=" + imageToUpload.name)
                .then(response => {
                    const url = response.data.fileUploadURL;
                    const options = {
                        headers: {"Content-Type": "multipart/form-data"}
                    };
                    axios.put(url, imageToUpload, options)
                        .then(() => {
                            uploadedImages.push(URL.createObjectURL(imageToUpload));
                            setErrorMessage(null);
                            setSuccessMessage("Image uploaded successfully");
                        })
                        .catch(() => {
                            setSuccessMessage(null);
                            setErrorMessage("Error occurred while uploading the image");
                        });
                    setImageToUpload(null);
                    setFileKey(Math.random().toString(16))
                });
        };

        // Handle selected file
        const selectImageHandler = (e: any) => {
            const imageFile = e.target.files[0];
            if (imageFile) {
                setErrorMessage(null);
                setSuccessMessage(null);

                // Image type validation
                if (imageFile && !imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                    setImageToUpload(null);
                    setErrorMessage("Please select image with format .jpg .jpeg .png or .gif");
                    return false
                }

                // Image size validation
                if (imageFile && imageFile.size >= 3000000) {
                    setImageToUpload(null);
                    setErrorMessage("The file is too large. Maximum 3MB");
                    return false
                }

                // Image content validation. (If png type was changed to .zip)
                reader.onload = (e: any) => {
                    const img: any = new Image();
                    img.onload = () => {
                        setImageToUpload(imageFile);
                    };
                    img.onerror = () => {
                        setErrorMessage("Invalid image content");
                        setImageToUpload(null);
                        return false;
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(imageFile);
            } else {
                setErrorMessage("Please select an image");
                setImageToUpload(null);
            }
        };

        const selectImageForView = (e: any, link: string | null) => {
            if (link === null) {
                if (e.target.classList.contains('backdrop')) {
                    setImageForView(null)
                }
            } else {
                setImageForView(link);
            }
        };

        return (
            <div className="layout">
                <div className="layout-header">
                    <div className="layout-wrapper">
                        <div className="layout-header-card">
                            <Info/>
                            <ImageUpload selectImageHandler={selectImageHandler}
                                         uploadImage={uploadImage}
                                         imageToUpload={imageToUpload}
                                         fileKey={fileKey}/>
                            <Message successMessage={successMessage} errorMessage={errorMessage}/>
                        </div>
                    </div>
                </div>
                <div className="layout-body">
                    <div className="layout-wrapper">
                        <ImagesView uploadedImages={uploadedImages}
                                    selectImageForView={selectImageForView}/>

                    </div>
                </div>
                {imageForView && <Modal imageForView={imageForView} selectImageForView={selectImageForView}/>}
            </div>
        );
    }
;

export default GalleryContainer;
