//import { Card, Space, Button } from 'antd';
import React from 'react';
import { Row, Col } from 'antd';
import TagCreate from './TagCreate'
import TagList from './TagList'
import { useState } from 'react';

const TagSection = () => {

    const appendData = () => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
        
    };

    return (
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
                <TagCreate />
                <TagList title={title} todo={todo} data={data}/>
            </Col>
        </Row>
    )
};

export default TagSection;