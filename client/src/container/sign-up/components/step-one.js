import React, { useEffect, useState } from "react";
import styles from "../styles/Index.module.css";
import { Row, Col, Input, Select, Alerts, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { endpoint } from "../../../../endpoints";
import axios from "axios";
import authAction from "../../../store/actions/authAction";

const VendorInfo = (props) => {
    const dispatch = useDispatch();
    const { TextArea } = Input;
    const { Option } = Select;
    const [confirmPassword, setConfirmPassword] = useState();
    const [Alerts, setAlerts] = useState(false);
    const [allStates, setAllStates] = useState([]);
    const [allCountry, setAllCountry] = useState([]);

    const { country, state } = useSelector(({ AuthReducer }) => AuthReducer);

    const [notify, setNotify] = useState({
        type: "",
        message: "",
        Alerts: false,
    });

    // STATES and COUNTRY API
    useEffect(() => {
        axios
            .get(`${endpoint.getStates}`)
            .then((res) => {
                setAllCountry(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${endpoint.getStates}/${country}`)
            .then((res) => {
                setAllStates(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [country]);
    // STATE and COUNTRY API ends

    const validatePassword = (value) => {
        setConfirmPassword(value);
        if (
            typeof props.values.c_password !== "undefined" &&
            typeof props.values.c_confirmPassword !== "undefined"
        ) {
            if (props.values.c_password !== props.values.c_confirmPassword) {
                setAlerts(true);
                setNotify({
                    type: "error",
                    message: "Check if password matches",
                });
            } else if (
                props.values.c_password === props.values.c_confirmPassword
            ) {
                setAlerts(false);
                setNotify({
                    type: "success",
                    message: "Password matched",
                });
            }
        }
    };

    const handleCountry = (value) => {
        dispatch(authAction.setAuthData({ country: value }));
    };
    const handleState = (value) => {
        dispatch(authAction.setAuthData({ state: value }));
    };

    return (
        <form className={styles.vendorInfo}>
            <div className={styles.Alerts}>
                {Alerts && (
                    <Alerts
                        type={notify.type}
                        message={notify.message}
                        closable
                    />
                )}
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_name">Company Name</label>
                        <Input
                            id="c_name"
                            value={props.values.c_name}
                            onChange={props.handleChange("c_name")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_email">Company Email</label>
                        <Input
                            id="c_email"
                            value={props.values.c_email}
                            onChange={props.handleChange("c_email")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_phone_num">
                            Company Phone Number
                        </label>
                        <Input
                            id="c_phone_num"
                            value={props.values.c_phone_num.replace(
                                /^(?!0$)0+/,
                                ""
                            )}
                            type="text"
                            onChange={props.handleChange("c_phone_num")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_person_name">
                            Contact Person Name
                        </label>
                        <Input
                            id="c_person_name"
                            value={props.values.c_person_name}
                            onChange={props.handleChange("c_person_name")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_person_email">
                            Contact Person Email
                        </label>
                        <Input
                            id="c_person_email"
                            value={props.values.c_person_email}
                            onChange={props.handleChange("c_person_email")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_person_num">
                            Contact Person Number
                        </label>
                        <Input
                            id="c_person_num"
                            value={props.values.c_person_num.replace(
                                /^(?!0$)0+/,
                                ""
                            )}
                            type="text"
                            onChange={props.handleChange("c_person_num")}
                        />
                    </div>
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div
                        className={`${styles.inputHolder} ${styles.pass} password`}
                    >
                        <label htmlFor="c_name">Password</label>
                        <Input.Password
                            id="c_password"
                            autoComplete="off"
                            value={props.values.c_password}
                            onChange={props.handleChange("c_password")}
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
                            id="c_confirmPassword"
                            autoComplete="off"
                            value={confirmPassword}
                            // onChange={validatePassword}
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

                <Col xs={{ span: 24 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_desc">Company Description</label>
                        <TextArea
                            rows={2}
                            id="c_desc"
                            value={props.values.c_desc}
                            onChange={props.handleChange("c_desc")}
                        />
                    </div>
                </Col>

                {/* STATE AND COUNTRY */}

                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_name">Country</label>
                        {/* <Input
                            id="country"
                            value={props.values.country}
                            onChange={props.handleChange("country")}
                        /> */}
                        <Select
                            className={styles.country}
                            onChange={handleCountry}
                            name="country"
                            placeholder="Select country"
                        >
                            {" "}
                            {allCountry.map((country, index) => {
                                return (
                                    <Option value={country.name}>
                                        {country.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="c_name">State</label>
                        <Select
                            className={styles.country}
                            onChange={handleState}
                            name="state"
                            placeholder="Select state"
                        >
                            {" "}
                            {allStates.map((state, index) => {
                                return (
                                    <Option value={state.name}>
                                        {state.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                </Col>

                {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.inputHolder}>
            <label>Country</label>
            <Select defaultValue="Nigeria" className="select-role">
              <Option value="Nigeria">Nigeria</Option>
              <Option value="Rwanda">Rwanda</Option>
            </Select>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className={styles.inputHolder}>
            <label>State</label>
            <Select defaultValue="Oyo" className="select-role">
              <Option value="Oyo">Oyo</Option>
              <Option value="Sokoto">Sokoto</Option>
            </Select>
          </div>
        </Col> */}

                {/* STATE AND COUNTRY ENDS */}

                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="s_address">Street Address</label>
                        <Input
                            id="s_address"
                            value={props.values.s_address}
                            onChange={props.handleChange("s_address")}
                        />
                    </div>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                    <div className={styles.inputHolder}>
                        <label htmlFor="postal_codes">Country code</label>
                        <Input
                            id="postal_codes"
                            value={props.values.postal_codes}
                            type="text"
                            maxlength="3"
                            onChange={props.handleChange("postal_codes")}
                        />
                    </div>
                </Col>
            </Row>
        </form>
    );
};

export default VendorInfo;
