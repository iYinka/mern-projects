import React, { useState } from "react";
import styles from "./styles/Header.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { TiUserDelete } from "react-icons/ti";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../service";
import { LoadingOutlined } from "@ant-design/icons";

const SettingsHeader = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const Token = localStorage.getItem("token");

    // DELETE USER
    const DeleteUserAccount = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${endpoints.deleteUser}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            }).then((res) => {
                setIsLoading(false);
                if (res.status !== 200) {
                    message.error(`Action denied! Try again later!`);
                    return;
                } else {
                    navigate("/");
                    message.success(`Account successfully deleted`);
                }
            });
        } catch (err) {
            message.error(`Could not find user.`);
        }
    };
    //  DELETE USER ENDS
    const antIcon = (
        <LoadingOutlined style={{ fontSize: "20", color: "#ffffff" }} spin />
    );

    return (
        <div className={styles.HeaderTop}>
            <button
                className={styles.delBtn}
                onClick={() => DeleteUserAccount()}
            >
                <span className={styles.tooltip}>
                    <TiUserDelete color="red" size={18} /> Delete your account?
                </span>{" "}
                {isLoading === false ? (
                    `Delete`
                ) : (
                    <span className={styles.blink_me}>Deleting...</span>
                )}
            </button>
            <div className={styles.topBar}>
                <ul>
                    <li
                        onClick={() => {
                            props.handleTabs("Contact Form");
                        }}
                        className={`${
                            props.tabs === "Contact Form" && styles.active
                        }`}
                    >
                        Contact Form
                    </li>

                    <li
                        onClick={() => {
                            props.handleTabs("Contacts");
                        }}
                        className={`${
                            props.tabs === "Contacts" && styles.active
                        }`}
                    >
                        Contacts
                    </li>
                </ul>
            </div>{" "}
            <button onClick={() => localStorage.removeItem("token")}>
                <Link to="/">Log Out</Link>
            </button>
        </div>
    );
};

export default SettingsHeader;
