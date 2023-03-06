import React, { useState, useEffect } from "react";
import styles from "./styles/Index.module.css";
import {
    Dropdown,
    Button,
    Checkbox,
    Menu,
    Select,
    Spin,
    TextArea,
    message,
    Input,
    Row,
    Col,
} from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import {
    MdBookmarks,
    MdDelete,
    MdKeyboardArrowDown,
    MdMarkEmailUnread,
} from "react-icons/md";
// import NumberFormat from "react-number-format";
import moment from "moment";
import { endpoints } from "../../service";

// import { capitalize } from "../../../../utils";
import Modal from "./../../components/Modal";
import Pagination from "./../../components/pagination";
import { BsCheckAll } from "react-icons/bs";
import { FaPhoneVolume, FaUserTie } from "react-icons/fa";

import type { CheckboxChangeEvent } from "antd/es/checkbox";

const Token = localStorage.getItem("token");

const ContactsTable = ({ props }) => {
    const { TextArea } = Input;
    const { Option } = Select;
    const [contacts, setContacts] = useState([]);
    const [showModal, setShowModal] = useState("");
    const [singleContact, setSingleContact] = useState({});
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        c_name: "",
        c_email: "",
        c_phone_no: "",
        c_desc: "",
        c_isActive: Boolean,
    });

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        fetchAllContacts();
    }, []);

    const fetchAllContacts = async () => {
        setIsLoading(true);
        try {
            let res = await fetch(`${endpoints.getAllContacts}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            }).then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    res.json().then((json) => {
                        setContacts(json);
                        message.success("Found saved contacts");
                    });
                }
            });
        } catch (err) {
            message.error("No contact found");
            setIsLoading(false);
        }
    };

    // DELETE CONTACT
    const DeleteContact = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                `${endpoints.deleteContact}/${singleContact.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${Token}`,
                    },
                }
            ).then((res) => {
                if (res.status !== 201) {
                    return;
                } else {
                    setContacts(
                        contacts.filter((contact) => {
                            return contact.id !== singleContact?.id;
                        })
                    );
                    message.success(
                        `${singleContact.name} successfully deleted`
                    );
                    setIsLoading(false);
                    fetchAllContacts();
                }
            });
        } catch (err) {
            message.error(
                `Couldn't delete contact with name: ${singleContact.name}`
            );
            setIsLoading(false);
        }
    };
    //  DELETE CONTACT ENDS

    // UPDATE CONTACT
    const UpdateContact = async () => {
        setIsLoading(true);
        const contactDetails = {
            name: values.c_name || singleContact.name,
            email: values.c_email || singleContact.email,
            phoneNumber: values.c_phone_no || singleContact.phoneNumber,
            occupation: "Doc." || singleContact.occupation,
            description: values.c_desc || singleContact.description,
            isActive: values.c_isActive || singleContact.isActive,
        };

        try {
            const res = await fetch(
                `${endpoints.updateContact}/${singleContact.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${Token}`,
                    },
                    body: JSON.stringify(contactDetails),
                    mode: "cors",
                    credentials: "same-origin",
                }
            ).then((res) => {
                fetchAllContacts();
                if (res.status !== 200) {
                    return;
                } else {
                    setContacts(
                        contacts.sort((contact) => {
                            return contact.id === singleContact?.id;
                        })
                    );
                }
            });
            setValues({
                c_name: "",
                c_email: "",
                c_phone_no: "",
                c_desc: "",
            });
            message.success(`Update successful`);
            setIsLoading(false);
        } catch (err) {
            message.error(
                `Couldn't update contact with name: ${singleContact.name}`
            );
            setIsLoading(false);
        }
    };
    //  UPDATE CONTACT ENDS

    //  For PAGINATION
    // Get current posts
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    const indexOfLastData = currentPage * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const TableData = contacts?.slice(indexOfFirstData, indexOfLastData);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // For PAGINATION ends

    const menu = (res) => (
        <Menu className={styles.menu}>
            <Menu.Item
                onClick={() => {
                    setShowModal("update contact");
                    setSingleContact(res);
                }}
            >
                Update
            </Menu.Item>
        </Menu>
    );

    const handleClose = () => {
        setShowModal("");
    };

    // ACTIVATION MODAL STARTS
    const deleteContactModal = (
        <Modal visible={showModal} onCancel={handleClose}>
            <div style={{ position: "absolute", left: "-9999px" }}> </div>
            <div className={styles.modal_img}>
                {/* <img src="/static/images/logo.svg" /> */}
            </div>
            <h3 className={styles.modal_h3}>
                Are you sure you want to {""}
                <span style={{ color: "#ff0000", fontSize: "16px" }}>
                    {singleContact?.isActive === true
                        ? "deactivate and DELETE"
                        : "DELETE"}
                </span>{" "}
                this contact with the name:{" "}
                <span style={{ color: "#ff0000", fontSize: "16px" }}>
                    {singleContact?.name}
                </span>
                ?
            </h3>

            <div className={styles.modal_btns}>
                <button
                    className={
                        singleContact?.isActive === true
                            ? `${styles.deactivate}`
                            : `${styles.activate}`
                    }
                    onClick={() => {
                        DeleteContact();
                        setTimeout(() => {
                            handleClose();
                        }, 500);
                    }}
                >
                    {singleContact?.isActive === true ? "Deactivate" : "Delete"}{" "}
                </button>
                <button
                    className={styles.reverse}
                    onClick={() => handleClose()}
                >
                    Reverse
                </button>
            </div>
        </Modal>
    );
    // ACTIVATION ENDs

    // EDIT MODAL
    const updateContactModal = (
        <Modal visible={showModal} onCancel={handleClose}>
            <div style={{ position: "absolute", left: "-9999px" }}> </div>
            <form className="updateForm">
                <Row gutter={[16, 16]}>
                    <Col md={{ span: 24 }}>
                        <div className="inputHolder">
                            <span>
                                <FaUserTie size={12} color="#1C3879" />
                            </span>
                            {/* <label htmlFor="c_name">Company Name</label> */}
                            <Input
                                id="c_name"
                                placeholder={singleContact.name}
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
                    <Col md={{ span: 24 }}>
                        <div className="inputHolder">
                            <span>
                                <MdMarkEmailUnread size={12} color="#1C3879" />
                            </span>
                            {/* <label htmlFor="c_name">Company Name</label> */}
                            <Input
                                type="email"
                                id="c_email"
                                placeholder={singleContact.email}
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
                    <Col md={{ span: 24 }}>
                        <div className="inputHolder">
                            <span>
                                <FaPhoneVolume size={15} color="#1C3879" />
                            </span>
                            {/* <label htmlFor="c_name">Company Name</label> */}
                            <Input
                                id="c_phone"
                                type="number"
                                placeholder={singleContact.phoneNumber}
                                onChange={(e) => {
                                    // const { value: numC } = e.target;
                                    // const reg = /^-?\d*(\.\d*)?$/;

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
                    <Col md={{ span: 24 }}>
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
                                    {/* {occupation.map((x, i) => (
                                        <Option value={x.name}>{x.name}</Option>
                                    ))} */}
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
                    <Col md={{ span: 24 }}>
                        <div className="textArea">
                            <TextArea
                                rows={8}
                                placeholder={singleContact.description}
                                value={values.c_desc}
                                onChange={(e) => {
                                    setValues({
                                        ...values,
                                        c_desc: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </Col>{" "}
                    <Col
                        md={{ span: 24 }}
                        className={
                            singleContact.isActive === true
                                ? `${styles.inactive}`
                                : `${styles.active}`
                        }
                    >
                        <Checkbox
                            defaultChecked={singleContact.isActive}
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    c_isActive:
                                        e.target.checked === true
                                            ? "true"
                                            : "false",
                                });
                            }}
                        />

                        <label htmlFor="c_role">
                            {singleContact.isActive === true
                                ? ` Deactivate contact?`
                                : ` Activate contact?`}
                        </label>
                    </Col>
                </Row>
                <Button
                    className="formBtn"
                    onClick={() => {
                        UpdateContact();
                        setTimeout(() => {
                            handleClose();
                        }, 500);
                    }}
                >
                    Update
                </Button>
            </form>
        </Modal>
    );
    // EDIT MODAL ENDS

    const contactData = TableData.reverse();
    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableContent}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th> S/N</th>
                            <th>NAME</th>
                            <th>PHONE NUMBER</th>
                            <th>EMAIL</th>
                            <th>DESCRIPTION</th>
                            <th>OCCUPATION</th>
                            <th>DATE ADDED</th>
                            {/* <th>LAST UPDATED</th> */}
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading === true && (
                            <tr>
                                <td colSpan="100%">
                                    <div className={styles.loader}>
                                        <Spin size="large" />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {isLoading === false && TableData.length === 0 && (
                            <tr>
                                <td colSpan="100%">
                                    <div className={styles.loader}>
                                        <p>No contact record found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {isLoading === false &&
                            TableData.length !== 0 &&
                            contactData.map((x, i) => (
                                <tr key={x._id}>
                                    <td style={{ textAlign: "right" }}>
                                        {i + 1}
                                    </td>
                                    <td>{x.name}</td> <td>{x.phoneNumber}</td>
                                    <td>{x.email}</td>
                                    <td>{x.description}</td>
                                    <th>{x.occupation}</th>
                                    <td>
                                        {moment(x.createdAt).format(
                                            "Do MM YYYY, h:mm:ss a"
                                        )}
                                    </td>
                                    {/* <td>
                                            {moment(x.updatedAt).format(
                                                "Do MM YYYY, h:mm:ss a"
                                            )}
                                        </td> */}
                                    <td>
                                        <div
                                            className={
                                                x.isActive === true
                                                    ? `${styles.active}`
                                                    : `${styles.inactive}`
                                            }
                                        >
                                            {" "}
                                            {x.isActive === true
                                                ? "active"
                                                : "inactive"}
                                        </div>
                                    </td>{" "}
                                    <td>
                                        <div className={styles.action}>
                                            <MdDelete
                                                className={styles.md_delete}
                                                size={25}
                                                onClick={() => {
                                                    setSingleContact(x);
                                                    setTimeout(() => {
                                                        setShowModal(
                                                            "delete contact"
                                                        );
                                                    }, 10);
                                                }}
                                            />
                                            <Dropdown
                                                overlay={menu(x)}
                                                trigger={["click"]}
                                                arrow
                                            >
                                                <Button
                                                    className={styles.option}
                                                >
                                                    <BiDotsVerticalRounded />
                                                </Button>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>{" "}
                {showModal === "delete contact" && deleteContactModal}
                {showModal === "update contact" && updateContactModal}
            </div>
            {TableData.length !== 0 && (
                <Pagination
                    pageSize={pageSize}
                    total={contacts?.length}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

export default ContactsTable;
