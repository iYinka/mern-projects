import React, { useEffect, useState } from "react";
import styles from "./styles/Index.module.css";
import { Col, Input, Row, Spin, Steps, TextArea } from "antd";
import * as EmailValidator from "email-validator";
import Notifications from "./components/Notifications";
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { endpoints } from "../../service";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const SignUp = (props) => {
    const { TextArea } = Input;
    const navigate = useNavigate();
    // const { Step } = Steps;
    // const [current, setCurrent] = useState(0);
    // const [successfulSetUp, setUpSuccessfulSetUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false,
    });

    const [notify, setNotify] = useState({
        type: "",
        message: "",
        isOpen: false,
    });

    const openNotification = (dataObject) => {
        notification.error({
            message: `${dataObject.title}`,
            description: dataObject.description,
            placement: dataObject.placement,
        });
    };

    const handleChange =
        (name) =>
        ({ target }) => {
            setValues({
                ...values,
                [name]: target.value,
            });
        };

    const antIcon = (
        <LoadingOutlined style={{ fontSize: "18", color: "#ffffff" }} spin />
    );

    // const handleClose = (reason) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     setNotify({
    //         ...Notify,
    //         isOpen: false,
    //     });
    // };

    const ValidateUser = () => {
        if (!values.name) {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Company name can not be empty",
            });
            return;
        }
        if (!values.email) {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Enter a valid email address",
            });
            return;
        }
        if (!EmailValidator.validate(values.email)) {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Email is invalid",
            });
            return;
        }
        if (!values.password) {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Enter your password",
            });
            if (values.password !== values.confirmPassword) {
                setIsOpen(true);
                setNotify({
                    type: "error",
                    message: "Passwords do not match.",
                });
                return;
            }
            return;
        }
        signUpUser();
    };

    const signUpUser = async () => {
        setIsLoading(true);
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
        };

        try {
            const res = await fetch(`${endpoints.signUpUser}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(userData),
                mode: "cors",
                credentials: "same-origin",
            }).then((res) => {
                if (res.status === 201) {
                    navigate("/my_contacts");
                    res.json().then((json) => {
                        localStorage.setItem("token", json.user.accessToken);

                        setIsLoading(false);
                        openNotification({
                            type: "success",
                            title: "Sign In",
                            description: json.message,
                            placement: "topLeft",
                        });
                    });
                } else if (res.status === 401) {
                    navigate("/");
                    res.json().then((json) => {
                        console.log(json.message);
                        setIsLoading(false);
                        openNotification({
                            type: "error",
                            title: json.status,
                            description: json.message,
                            placement: "bottomRight",
                        });
                    });
                } else if (res.status === 404) {
                    navigate("/");
                    res.json().then((json) => {
                        console.log(json.message);
                        setIsLoading(true);
                        openNotification({
                            type: "error",
                            title: json.status,
                            description: json.message,
                            placement: "bottomRight",
                        });
                    });
                }
            });
        } catch (err) {
            console.log();
        }
    };

    setTimeout(() => {
        setIsLoading(false);
    }, 5000);

    return (
        <div className={styles.container}>
            {isOpen && (
                <Notifications
                    className={styles.alert}
                    notify={notify}
                    setNotify={setNotify}
                />
            )}
            <div className={styles.stepsForm}>
                <div className={styles.formContainer}>
                    <img src="/images/logo.svg" alt="" />
                    <h2> Welcome here, please Sign Up to use eContact.</h2>
                    <h6>Provide your information.</h6>
                    <div className={styles.form}>
                        {/* <form className={styles.vendorInfo}> */}
                        <Row gutter={[16, 16]}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <div className={styles.inputHolder}>
                                    <label htmlFor="name">Name</label>
                                    <Input
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange("name")}
                                    />
                                </div>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <div className={styles.inputHolder}>
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                    />
                                </div>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <div
                                    className={`${styles.inputHolder} ${styles.pass} password`}
                                >
                                    <label htmlFor="password">Password</label>
                                    <Input.Password
                                        id="password"
                                        autoComplete="off"
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        iconRender={(visible) =>
                                            visible ? (
                                                <EyeTwoTone />
                                            ) : (
                                                <EyeInvisibleOutlined />
                                            )
                                        }
                                    />
                                </div>
                            </Col>

                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <div
                                    className={`${styles.inputHolder} ${styles.pass} password`}
                                >
                                    <label htmlFor="">Confirm Password</label>
                                    <Input.Password
                                        id="confirmPassword"
                                        autoComplete="off"
                                        value={values.confirmPassword}
                                        onChange={handleChange(
                                            "confirmPassword"
                                        )}
                                        iconRender={(visible) =>
                                            visible ? (
                                                <EyeTwoTone />
                                            ) : (
                                                <EyeInvisibleOutlined />
                                            )
                                        }
                                    />
                                </div>
                            </Col>
                            <div className={styles.btnDiv}>
                                <button
                                    className={styles.loaderBtn}
                                    onClick={() => ValidateUser()}
                                    disable={isLoading}
                                >
                                    {!isLoading ? (
                                        "Sign Up"
                                    ) : (
                                        <>
                                            <span className={styles.blink_me}>
                                                Creating...
                                            </span>{" "}
                                            <Spin indicator={antIcon} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </Row>
                        {/* </form> */}
                    </div>
                    <div className={styles.bottomLinks}>
                        <p>
                            Already have an account?
                            <Link to="/">
                                <span>Log In</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
