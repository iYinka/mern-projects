import React from "react";
import styles from "./styles/BtnLoader.module.css";
import { Row, Col } from "antd";

import Spinner from "../../spinner";

const BtnLoader = (props) => {
    return (
        <button
            className={styles.loaderBtn}
            {...props}
            disable={props.disabled}
        >
            <Row gutter={[16, 16]}>
                {props.loading && (
                    <Col xs={8}>
                        <Spinner color="#FFFFFF" size={18} />
                    </Col>
                )}
                <Col xs={props.loading ? 16 : 24}>
                    <p>{props.text}</p>
                </Col>
            </Row>
        </button>
    );
};

export default BtnLoader;

{
    /* <ButtonLoader */
}
//   text="Sign In"
//   onClick={() => validate()}
//   disabled={isLoading}
//   loading={isLoading}
{
    /* /> */
}
