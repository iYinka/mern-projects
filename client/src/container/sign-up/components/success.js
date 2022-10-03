import React, { useState, useEffect } from "react";
import styles from "./../../Login/styles/Login.module.css";
import { Input, Button, Row, Col } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import * as EmailValidator from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// import { ButtonLoader } from "../../components/buttons";

const SuccessfulSetup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.bck}>
      <Row style={{ minHeight: "100vh" }}>
        
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.columns}>
          <div className={styles.bg}>
            <img src="/images/success_monitor.svg" alt="" />
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
          <div className={styles.success}>
            <div>
              <img src="/images/success_checked.svg" alt="" />
            </div>
            <h2>Hurray!! Your account has been verified successfully.</h2>
              <p>
                Congratulations your organization has been signed up to the exalt platform.
                Kindly go to your email for further instructions to finalize your account creation.
                <button onClick={() => router.push("/")}>Let's GO</button>
              </p>
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default SuccessfulSetup;
