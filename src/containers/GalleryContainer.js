import React, {useState, useEffect} from 'react';
import axios from "axios";
import "../assets/style/galleryContainer.scss"
import ImageUpload from "../components/ImageUpload";
import ImagesView from "../components/ImagesView";
import Message from "../components/Message";
import UploadProgress from "../components/UploadProgress";

const GalleryContainer = () => {

    const [imageToUpload, setImageToUpload] = useState();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [fileInput, setFileInput] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
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
                axios({
                    method: "PUT",
                    url: url,
                    data: imageToUpload,
                    headers: {"Content-Type": "multipart/form-data"}
                })
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
                setFileInput(Math.random().toString(16))
            });
    };

    // Handle selected file
    const selectImageHandler = e => {
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
            if (imageFile && imageFile.size >= 1000000) {
                setImageToUpload(null);
                setErrorMessage("The file is too large. Maximum 1MB");
                return false
            }

            // Image content validation. (If png type was changed to .zip)
            reader.onload = e => {
                const img = new Image();
                img.onload = () => {
                    setImageToUpload(imageFile);
                };
                img.onerror = () => {
                    setErrorMessage("invalid image content");
                    setImageToUpload(null);
                    return false;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(imageFile);
        } else {
            setErrorMessage("Please select an image");
        }
    };

    return (
        <div className="gallery-container">
            <ImageUpload selectImageHandler={selectImageHandler}
                         uploadImage={uploadImage}
                         imageToUpload={imageToUpload}
                         fileInput={fileInput}/>
            <UploadProgress/>
            <Message successMessage={successMessage}
                     errorMessage={errorMessage}/>
            <ImagesView uploadedImages={uploadedImages}/>
        </div>
    );
};

export default GalleryContainer;
