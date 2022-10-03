import React, { useState, useEffect } from "react";
import styles from "./../../Login/styles/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Input, Row, Col, notification } from 'antd';
// import * as EmailValidator from 'email-validator';
import { Router, useRouter } from 'next/router';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { endpoint } from '../../../../endpoints';
import {setVerifyVendor} from '../../../store/actions/authAction'



const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const passedData = router.query.data ? JSON.parse(router.query.data) : {};


  const { makeVisible } = useSelector(({VisibilityReducer}) => VisibilityReducer)

  
  const sendOtp = (value, email) => {
    if (value.length === 4) {
      dispatch(
        setVerifyVendor({
            OTPCode: value,
            email: email
          },
          (res) => {
            if (Object.keys(res).length > 0) {
              openNotification(res);
            }
          },
          () => {
            router.push('success');
          }
        )
      );
    }
  };


  


 const openNotification = (dataObject) => {
    notification.error({
      message: `${dataObject.title}`,
      description: dataObject.description,
      placement: dataObject.placement,
    });
 };
  
  

  return (
    <div className={styles.bck}>
      <Row style={{ minHeight: "100vh" }}>
        
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.columns}>
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
          <div className={styles.verify_input}>
            <div>
              <img src="/images/logo.svg" alt="" />
            </div>
            <div>
              <h2>Verify your Account</h2>
              <p>Enter the 4 digit code sent to you {makeVisible && `at ${passedData.phoneNumber} or ${' '} ${'\n'} ${passedData.email}`}</p>
            </div>
            <div>
              <OtpInput
                value={otp}
                onChange={(val) => {
                  setOtp(val);
                  sendOtp(val, passedData.email)
                }}
                isInputNum={true}
                numInputs={4}
                inputStyle={styles.otp_inputs}
                containerStyle={styles.otp_inputs_container}
              />
            </div>
            <div className={styles.bottomLinks}>
              <Link href="/resend-token">
                <p>Resend Verification Code</p>
              </Link>
            </div>
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default OtpPage;
