import React, { useState, useEffect } from "react";
import styles from "./../../forgot-password/styles/Forgot_password.module.css";
import { Input, Button, Row, Col, Alert, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import * as EmailValidator from "email-validator";
import { ButtonLoader } from "../../../components/buttons";
import { resendToken } from "../../../store/actions/authAction";
import Spinner from "../../../components/spinner";
// import axios from 'axios'
// import { endpoint } from '../../../../endpoints'

const ResendToken = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const [notify, setNotify] = useState({
        type: "",
        message: "",
        alert: false,
    });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const validate = () => {
        if (!values.email || values.email === "") {
            setOpen(true);
            setNotify({
                type: "error",
                message: "Submit a valid Email address",
            });
            return;
        }
        if (!EmailValidator.validate(values.email)) {
            setOpen(true);
            setNotify({
                type: "error",
                message: "Submit a valid Email address",
            });
            return;
        }
        sendOtp();
    };

    const sendOtp = () => {
        setIsLoading(true);
        if (values.email) {
            dispatch(
                resendToken(
                    {
                        email: values.email,
                        verificationMode: "OTP",
                    },
                    (res) => {
                        if (Object.keys(res).length > 0) {
                            openNotification(res);
                        }
                    },
                    () => {
                        router.push("verify-account");
                    }
                )
            );
        }
    };

    const openNotification = (dataObject) => {
        notification.open({
            type: dataObject.type,
            message: `${dataObject.title}`,
            description: dataObject.description,
            placement: dataObject.placement,
        });
    };

    setTimeout(() => {
        setIsLoading(false);
    }, 5000);

    return (
        <div className={styles.bck}>
            <div className={styles.alert}>
                {open && (
                    <Alert
                        type={notify.type}
                        message={notify.message}
                        closable
                        afterClose={handleClose}
                    />
                )}
            </div>
            <Row style={{ minHeight: "100vh" }}>
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    className={styles.columns}
                >
                    <div className={styles.bg}>
                        <img src="/images/verify.svg" alt="" />
                    </div>
                </Col>

                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{ overflow: "auto", height: "100vh" }}
                >
                    <div className={`${styles.formHolder} ${styles.token}`}>
                        <img src="/images/logo.svg" alt="" />
                        <h2>Vaspack Partners</h2>

                        <div className={styles.inputHolder}>
                            <label htmlFor="email">Email Address</label>
                            <Input
                                id="email"
                                value={values.email}
                                placeholder="Enter Email Address"
                                onChange={(e) => {
                                    setValues({ email: e.target.value });
                                }}
                            />
                        </div>

                        <ButtonLoader
                            text="Send Recovery Link"
                            onClick={() => validate()}
                            disabled={isLoading}
                            loading={!isLoading}
                        />

                        <div className={styles.signUpDiv}>
                            <p>
                                Don't have an account{" "}
                                <Link href="/sign-up">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ResendToken;
