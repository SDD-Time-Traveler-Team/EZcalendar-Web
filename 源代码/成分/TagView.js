importimport React, {useState} from 'react';
import { Row, Col } from 'antd';
import TagCreate from './TagCreate';
import Tag from './Tag';


const TagView = () => {

    const [tags, setTags] = useState({
        "1": {title:"Event1", duration: "3:30"},
        "2": {title:"Event2", duration: "2:00"},
        "3": {title:"Event3", duration: "5:23"},
    });

    const deleteTag = (id) => {
        setTags(prev => {
            let newTags = Object.assign({}, tags);
            delete newTags[id];
            return newTags
        });
    }

    return (
        <Row>
            <Col span = {24}>
                <Row>
                    <Col span = {24}>
                    {Object.entries(tags).map(([id, item]) => (
                        <Tag key={id} title={item.title} duration={item.duration} id={id} onDelete={deleteTag}/>
                    ))}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TagCreate/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TagView;
