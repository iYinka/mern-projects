import React from "react";
import { Drawer } from "antd";

const DrawerNav = (props) => {
    return (
        <div>
            <Drawer
                placement="left"
                closable={false}
                visible={props.drawerVisibility}
                className="drawer"
                width={400}
                {...props}
            >
                {props.children}
            </Drawer>
        </div>
    );
};

export default DrawerNav;
