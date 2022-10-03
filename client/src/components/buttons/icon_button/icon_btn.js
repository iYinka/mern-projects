import React from "react";
import styles from "./styles/IconBtn.module.css";

const IconBtn = (props) => {
  return (
    <button
      className={styles.icon_btn}
      {...props}
      disable={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default IconBtn;
