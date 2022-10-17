import React from 'react';
import {Button, Dropdown, Menu, PageHeader, Space} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import logo from "../assets/EZlogo.jpg";

export default function NavBar({signOut}) {
    const menu = <Menu
        items={[
            {
                label: (
                    <Button type="link" danger onClick={signOut()}>Sign Out</Button>
                ),
                key: "sign_out"
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
                        <Button onClick={(e) => e.preventDefault()}>
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