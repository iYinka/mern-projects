import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import styles from "./styles/FileUploader.module.css";

const FileUploader = ({ file_label }) => {
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleFileUpload = (e) => {
        setSelectedFileName(e.target.files[0].name);
        setIsLoadingImage(true);
        console.log(e.target.files[0]);
    };

    return (
        <div className={styles.uploader}>
            <input
                type="file"
                name="file"
                id="file"
                className={styles.inputfile}
                onChange={handleFileUpload}
            />
            {!isLoadingImage ? (
                <div className={styles.label_Svg}>
                    <FaCloudUploadAlt />
                    <label for="file">{file_label} </label>
                </div>
            ) : (
                <p className={styles.selected_filename}>{selectedFileName}</p>
            )}
        </div>
    );
};

export default FileUploader;
