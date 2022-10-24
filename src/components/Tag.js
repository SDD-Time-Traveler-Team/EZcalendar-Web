import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Card} from 'antd';
import Meta from "antd/es/card/Meta";
const Tag = (props) => {
    return (
        <>
            <Card style={{marginLeft:"2.5%", width:'95%', marginTop: 5}}
                  title={props.title}
                  extra={props.duration}
                  hoverable={true}
                  actions={[
                      <EditOutlined key="edit"/>,
                      <DeleteOutlined key="delete"/>
                  ]}>
                <Meta
                    description={props.description}
                />
            </Card>
        </>
    );
};
export default Tag;
