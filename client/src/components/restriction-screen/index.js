import React from "react";
import styles from "./styles/Index.module.css";

const RestrictionScreen = () => {
    return (
        <div className={styles.root}>
            <img src="/static/images/restriction.svg" alt="" />
            <h2>Ouch...!!!</h2>
            <h2>Device screen not supported on this website.</h2>
            <h5>Kindly open using either a PC or any other larger screen.</h5>
        </div>
    );
};

export default RestrictionScreen;
