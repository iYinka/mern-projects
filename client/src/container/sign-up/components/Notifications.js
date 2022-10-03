import React from "react";
import { Alert } from "antd";
import styles from "../styles/Index.module.css";

function Notifications(props) {
    const { notify, setNotify } = props;
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false,
        });
    };
    return (
        <div className={styles.alert}>
            <Alert
                message={notify.message}
                type={notify.type}
                closable
                onClose={handleClose}
            />
        </div>
    );
}

export default Notifications;
