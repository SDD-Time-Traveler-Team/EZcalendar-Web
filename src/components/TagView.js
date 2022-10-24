//import { Card, Space, Button } from 'antd';
import React, {useState} from 'react';
import { Row, Col } from 'antd';
import TagCreate from './TagCreate';
import Tag from './Tag';


const TagView = () => {
    const [tags, setTags] = useState([
        {title:"event1", duration: "3h"},
        {title:"event2", duration: "2h"},
        {title:"event3", duration: "5h"},
    ]);


    return (
        <Row>
            <Col>
                <Row gutter={23}>
                    <TagCreate/>
                </Row>
                <Row gutter={23}>
                    {tags.map(item=>(
                        <Tag key = {item.title} title={item.title} duration={item.duration}/>
                    ))}
                </Row>

            </Col>
        </Row>
    )
}

export default TagView;
