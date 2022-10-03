import React, { useMemo, useState, useEffect } from "react";
import styles from "../styles/Index.module.css";
import { Row, Col, Input, notification, Spin } from "antd";
import { MdCloudUpload } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { endpoint } from "../../../../endpoints";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../../../store/actions/authAction";

const MoreInfoStepTwo = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [logo, setLogo] = useState({
        base64: "/images/profile.png",
        formatedBase64: "",
    });

    setTimeout(() => {
        setIsLoading(false);
        // setIsLoadingImage(false);
    }, 5000);

    const { vendor, token, image } = useSelector(
        ({ AuthReducer }) => AuthReducer
    );

    //EDIT VENDOR PROFILE PIC///
    const editVendorProfilePic = (image) => {
        setIsLoadingImage(true);
        // var formData = new FormData();
        // formData.append("img", image);
        axios
            .post(
                endpoint.editProfilePic,
                { img: logo.base64 },
                {
                    headers: {
                        "x-auth-token": token,
                    },
                }
            )
            .then((res) => {
                openNotification({
                    type: "success",
                    title: "Successful",
                    description: "Profile picture successfully uploaded.",
                    placement: "topLeft",
                });
            })
            .catch((error) => {
                console.log(error);
                openNotification({
                    type: "error",
                    title: "Oooopsss....!!!",
                    description:
                        "Error occurred while updating your profile picture.",
                    placement: "topRight",
                });
            });
    };
    // EDIT VENDOR PROFILE PIC ENDS///

    const openNotification = (dataObject) => {
        notification.open({
            type: dataObject.type,
            message: `${dataObject.title}`,
            description: dataObject.description,
            placement: dataObject.placement,
        });
    };

    // DROPZONE
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            // editVendorProfilePic(acceptedFiles[0]);
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setIsLoadingImage(true);
            getBase64(acceptedFiles[0]);
            dispatch(authAction.setAuthData({ image: acceptedFiles[0] }));
        },
    });
    function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const { result } = reader;
            setLogo({
                base64: result,
                formatedBase64: result.split(",")[1],
            });
            // console.log(result.split(",")[1]);
            // console.log("LOGO here>>>", logo);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }
    // DROPZONE ENDS

    return (
        <div className={styles.vendorInfo}>
            <h4 className={styles.docTitle}>
                Kindly upload documents to verify RC and ITIN Number
            </h4>
            <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="rc_num">RC Number</label>
                        <Input
                            id="rc_num"
                            value={props.values.rc_num}
                            onChange={props.handleChange("rc_num")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="itin_num">ITIN Number</label>
                        <Input
                            id="itin_num"
                            value={props.values.itin_num}
                            onChange={props.handleChange("itin_num")}
                        />
                    </div>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                    <div className={styles.documentUpload} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!isLoadingImage && (
                            <div style={{ textAlign: "center" }}>
                                <FaCloudUploadAlt />
                                <p>Upload Profile Image</p>
                            </div>
                        )}
                        {isLoadingImage && (
                            <div style={{ textAlign: "center" }}>
                                <img src={logo.base64} alt="" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MoreInfoStepTwo;
