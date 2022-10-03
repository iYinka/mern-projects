import React from "react";
import { useDispatch } from "react-redux";
import { networkAction } from "../../store/actions";
import styles from "./styles/Card.module.css";

const CardComp = (props) => {
    const dispatch = useDispatch();
    return (
        <div
            className={styles.card}
            onClick={() => {
                dispatch(
                    networkAction.setNetworkData({
                        tableData: props.table,
                        provService: props.provService,
                        serviceIcon: props.serviceIcon,
                    })
                );
            }}
        >
            <div className={styles.cardDetails}>
                {props.icon}
                <p className={styles.title}>{props.title}</p>
                <p className={styles.num}>{props.num}</p>
            </div>
        </div>
    );
};

export default CardComp;
