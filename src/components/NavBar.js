import Icon from '@ant-design/icons';
import { Menu, Image } from 'antd';
import React, { useState } from 'react';

const items = [
    {
        key: 'icon',
        icon: <Icon
            component={() => <Image src="../../public/logo192.png"/>}
        />
    },
];

export default function NavBar() {
    return (
        <>
            <Menu selectable={false} selectedKeys={["icon"]} mode="horizontal" items={items} />
        </>
    );
};

