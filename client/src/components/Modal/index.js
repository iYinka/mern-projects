import React from "react";
import { Modal } from "antd";

const ModalNav = (props) => {
    return (
        <div>
            <Modal
                closable={true}
                centered={true}
                visible={props.modalVisibility}
                className="modal"
                width={400}
                {...props}
            >
                {props.children}
            </Modal>
        </div>
    );
};

export default ModalNav;
