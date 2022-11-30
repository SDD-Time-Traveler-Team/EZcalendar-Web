import React, {useState} from 'react';
import {Button, Dropdown, Menu, PageHeader, Space} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import logo from "../assets/EZlogo.jpg";
import Authentication from "../utils/Authentication";
import {useNavigate} from "react-router-dom";

export default function NavBar({setLoginStatus}) {
    const [auth] = useState(new Authentication());
    const navigate = useNavigate();

    //handle signing out
    const onClickSignOut = async () => {
        auth.signOut().then(() => {
            auth.user = null;
            auth.email = null;
            navigate("/login")
        }).catch((err) => {
            console.log(`sign out fail ${err}`);
        });
        setLoginStatus(false);
    }

    //menu component
    const menu = <Menu
        items={[
            {
                label: (
                    <Button type="link" danger onClick={onClickSignOut}>Sign Out</Button>
                ),
                key: 0
            }
        ]}
    />
    return (
        <>
            <PageHeader
                className={"site-page-header"}
                avatar={{src: logo}}
                title={"EZcalendar"}
                extra={[
                    <Dropdown overlay={menu}>
                        <Button>
                            <Space>
                                <UserOutlined/>
                            </Space>
                        </Button>
                    </Dropdown>
                ]}
            />
        </>
    )
}