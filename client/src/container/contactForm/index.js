import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import {
    Alert,
    Button,
    Checkbox,
    Col,
    Input,
    message,
    Row,
    Select,
    Spin,
    TextArea,
} from "antd";
import { FaUserTie, FaPhoneVolume, FaEnvelopeOpen } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import {
    MdMarkEmailUnread,
    MdBookmarks,
    MdKeyboardArrowDown,
} from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import "antd/dist/antd.css";
import { endpoints } from "../../service";

function ContactForm(props) {
    const { TextArea } = Input;
    const { Option } = Select;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [values, setValues] = useState({
        c_name: "",
        c_email: "",
        c_phone_no: "",
        c_desc: "",
    });
    const [notify, setNotify] = useState({
        type: "",
        message: "",
    });

    const Token = localStorage.getItem("token");

    const occupation = [{ name: "Actor" }, { name: "Engineer" }];

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log("search:", value);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false,
        });
    };

    const CreateNewContact = () => {
        if (!values.c_name || values.c_name === "") {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Contact name can not be empty",
            });
            return;
        }

        if (!values.c_email || values.c_email === "") {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Submit a valid contact Email address",
            });
            return;
        }
        if (!EmailValidator.validate(values.c_email)) {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Submit a valid Email address",
            });
            return;
        }
        if (!values.c_phone_no || values.c_phone_no === "") {
            setIsOpen(true);
            setNotify({
                type: "error",
                message: "Contact Phone number can not be empty",
            });
            return;
        }

        CreateContact();
    };

    const CreateContact = async () => {
        setIsLoading(true);
        const contactDetails = {
            name: values.c_name,
            email: values.c_email,
            phoneNumber: values.c_phone_no,
            occupation: "Doc.",
            description: values.c_desc,
            isActive: false,
        };

        try {
            const res = await fetch(`${endpoints.createContact}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${Token}`,
                },
                body: JSON.stringify(contactDetails),
                mode: "cors",
                credentials: "same-origin",
            }).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    props.handleTabs("Contacts");
                }
                if (res.status === 400) {
                    setIsOpen(true);
                    setNotify({
                        type: "error",
                        message: "Contact's phone number exists",
                    });
                }
                return res.json;
            });
        } catch (err) {
            console.log(err);
        }
    };

    setTimeout(() => {
        setIsOpen(false);
    }, 3000);

    return (
        <div className="contact-form">
            <div className="alert">
                {isOpen && (
                    <Alert
                        type={notify.type}
                        message={notify.message}
                        closable
                        onClose={handleClose}
                    />
                )}
            </div>

            {/* <h1>Contact Form</h1> */}
            <form className="form">
                <Row gutter={[16, 16]}>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <div className="inputHolder">
                            <span>
                                <FaUserTie size={12} color="#1C3879" />
                            </span>
                            {/* <label htmlFor="c_name">Company Name</label> */}
                            <Input
                                id="c_name"
                                placeholder="Your Name *"
                                value={values.c_name}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        c_name: e.target.value,
                                    });
                                }}
                            />
                            <span>
                                <BsCheckAll size={15} color="#1C3879" />
                            </span>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <div className="inputHolder">
                            <span>
                                <MdMarkEmailUnread size={12} color="#1C3879" />
                            </span>
                            {/* <label htmlFor="c_name">Company Name</label> */}
                            <Input
                                type="email"
                                id="c_email"
                                placeholder="Your Email *"
                                value={values.c_email}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        c_email: e.target.value,
                                    });
                                }}
                            />
                            <span>
                                <BsCheckAll size={15} color="#1C3879" />
                            </span>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <div className="inputHolder">
                            <span>
                                <FaPhoneVolume size={15} color="#1C3879" />
                            </span>
                            {/* <label htmlFor="c_name">Company Name</label> */}
                            <Input
                                id="c_phone"
                                type="number"
                                autocomplete="off"
                                placeholder="Phone: 80345689... *"
                                value={values.c_phone_no}
                                onChange={(e) => {
                                    // const { value: numC } = e.target;
                                    // const reg = /^-?\d*(\.\d*)?$/;
                                    // // /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/;

                                    // if (
                                    //     reg.test(numC) ||
                                    //     numC === "" ||
                                    //     numC === "-"
                                    // ) {
                                    //     onChange(numC);
                                    // }

                                    setValues({
                                        ...values,
                                        c_phone_no: e.target.value,
                                    });
                                }}
                            />
                            <span>
                                <BsCheckAll size={15} color="#1C3879" />
                            </span>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }}>
                        <div className="">
                            {/* <label htmlFor="c_role">Company Category</label> */}
                            <div className="selector">
                                <span className="selector_phoneIcon">
                                    <MdBookmarks size={15} color="#1C3879" />
                                </span>
                                <Select
                                    placeholder="Select relationship"
                                    optionFilterProp="children"
                                    // onChange={onChange}
                                    // onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                >
                                    {occupation.map((x, i) => (
                                        <Option value={x.name}>{x.name}</Option>
                                    ))}
                                </Select>
                                <span className="selector_phoneIcon">
                                    <MdKeyboardArrowDown
                                        size={25}
                                        color="#1C3879"
                                    />
                                </span>
                            </div>
                        </div>
                    </Col>
                    {/* <Col xs={{ span: 24 }} md={{ span: 12 }}> */}
                    <div className="textArea">
                        <span>
                            <FaEnvelopeOpen size={10} color="#1C3879" />
                        </span>
                        <TextArea
                            rows={8}
                            placeholder="Your message"
                            value={values.c_desc}
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    c_desc: e.target.value,
                                });
                            }}
                        />
                        <span>
                            <FcCancel size={15} color="#1C3879" />
                        </span>
                    </div>
                </Row>
                <Button
                    className="formBtn"
                    onClick={() => {
                        CreateNewContact();
                    }}
                >
                    {isLoading === false ? (
                        "Add Contact"
                    ) : (
                        <>
                            <span className="blink_me">In Progress...</span>{" "}
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}

export default ContactForm;
