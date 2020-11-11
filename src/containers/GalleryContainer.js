import React, {useState, useEffect} from 'react';
import axios from "axios";
import ImageUpload from "../components/ImageUpload";
import ImagesView from "../components/ImagesView";
import Message from "../components/Message";
import UploadProgress from "../components/UploadProgress";

const GalleryContainer = () => {

    const [imageToUpload, setImageToUpload] = useState();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadSuccessMsg, setUploadSuccessMsg] = useState();
    const [uploadErrorMsg, setUploadErrorMsg] = useState();

    useEffect(() => {
        axios.get("https://ubhgn4dllg.execute-api.eu-north-1.amazonaws.com/get-images")
            .then(response => {
                setUploadedImages(response.data.imagesUrlArray);
            })
    });

    const uploadFile = () => {
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
                        setUploadSuccessMsg("File uploaded successfully");
                        setUploadErrorMsg(undefined)
                    })
                    .catch(() => {
                        setUploadErrorMsg("Error occured while uploading the file");
                        setUploadSuccessMsg(undefined);
                    });
            });
    };

    return (
        <div className="gallery-container">
            <ImageUpload uploadFile={uploadFile}
                         setImageToUpload={setImageToUpload}
                         imageToUpload={imageToUpload}/>
            <UploadProgress/>
            <Message uploadSuccessMsg={uploadSuccessMsg}
                     uploadErrorMsg={uploadErrorMsg}/>
            <ImagesView uploadedImages={uploadedImages}/>
        </div>
    );
};

export default GalleryContainer;
