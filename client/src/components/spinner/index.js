import React from "react";
import styles from './Index.module.css';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = ({ color }) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: color }} spin />
  );

  return (
    <div className={styles.spinner}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Spinner;
