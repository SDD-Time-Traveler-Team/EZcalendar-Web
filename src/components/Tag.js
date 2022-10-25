import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons';
import {Card, Button} from 'antd';
import Meta from "antd/es/card/Meta";

const Tag = ({title, duration, id, onDelete}) => {
    return (
        <>
            <Card style={{marginLeft:"2.5%", width:'95%', marginTop: 5}}
                  hoverable={true}
                  actions={[
                      <Button type="text" icon={<PlusOutlined/>}/>,
                      <Button type="text" danger icon={<DeleteOutlined/>} onClick={() => onDelete(id)}/>
                  ]}>
                <Meta title={title}
                      description={duration}/>
            </Card>
        </>
    );
};
export default Tag;
