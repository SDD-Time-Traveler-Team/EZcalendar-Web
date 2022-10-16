//import { Card, Space, Button } from 'antd';
import React from 'react';
import { Row, Col } from 'antd';
import TagCreate from './TagCreate'

const TagView = () => (
    <Row>
        <Col
            xs={{
                span: 5,
                offset: 1,
            }}
            lg={{
                span: 6,
                offset: 2,
            }}
        >
            <TagCreate/>
        </Col>
    </Row>
);

export default TagView;