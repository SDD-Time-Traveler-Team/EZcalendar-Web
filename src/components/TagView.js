import React, {useState} from 'react';
import { Row, Col } from 'antd';
import TagCreate from './TagCreate';
import Tag from './Tag';


const TagView = () => {
    const [tags, setTags] = useState([
        {title:"Event1", duration: "3:30", description: "I am an event"},
        {title:"Event2", duration: "2:00", description: "I am also an event"},
        {title:"Event3", duration: "5:23", description: "I don't know if I am an event"},
    ]);


    return (
        <Row>
            <Col>
                <Row>
                    {tags.map(item=>(
                        <Tag key = {item.title} title={item.title} duration={item.duration} description={item.description}/>
                    ))}
                </Row>
                <Row>
                    <TagCreate/>
                </Row>
            </Col>
        </Row>
    )
}

export default TagView;
