import React from "react";
import styles from "./styles/Header.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const SettingsHeader = (props) => {
    return (
        <div className={styles.HeaderTop}>
            <div></div>
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
