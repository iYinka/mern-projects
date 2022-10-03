import React from "react";
import styles from "./styles/Header.module.css";

const SettingsHeader = (props) => {
    return (
        <div className={styles.HeaderTop}>
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
            </div>
        </div>
    );
};

export default SettingsHeader;
