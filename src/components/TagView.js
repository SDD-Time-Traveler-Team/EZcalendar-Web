import React, {useState} from 'react';
import { Row, Col, List } from 'antd';
import TagCreate from './TagCreate';
import Tag from './Tag';
import VirtualList from 'rc-virtual-list';

const TagView = ({eventTasks, setEventtasks}) => {

    const [tags, setTags] = useState({
        "1": {title:"Event1", duration: "3:30"},
        "2": {title:"Event2", duration: "2:00"},
        "3": {title:"Event3", duration: "5:23"},
        "4": {title:"Event4", duration: "3:30"},
        "5": {title:"Event5", duration: "2:00"},
        "6": {title:"Event6", duration: "5:23"},
        "7": {title:"Event7", duration: "3:30"},
        "8": {title:"Event8", duration: "2:00"},
        "9": {title:"Event9", duration: "5:23"},
    });

    const CreateTag = (tagTitle, tagDuration) => {
        setTags(prev => {
            let newTags = Object.assign({}, tags);
            //placeholder tag id; tag id has to be fetched from the database
            const objkeys = Object.entries(newTags)
            let tagID = "0"
            if(objkeys.length>0)
            {
                let tmp = parseInt(objkeys[0][0])
                for (let i = 1; i < objkeys.length; i++) {
                    if(parseInt(objkeys[i][0]) > tmp){
                        tmp = objkeys[i][0]
                    }
                }
                tagID = (parseInt(tmp)+1).toString();
            }
            newTags = Object.assign({[`${tagID}`]: {title: tagTitle, duration: tagDuration}}, newTags)
            return newTags
        });
    }

    const putTaginCalendar = (eventTasksTitle, eventTasksStart, eventTasksEnd) =>{
        setEventtasks(current => [...current, 
            {
                title  : eventTasksTitle,
                start  : eventTasksStart,
                end    : eventTasksEnd
            }
        ]);
    }

    const deleteTag = (id) => {
        console.log(id)
        setTags(prev => {
            let newTags = Object.assign({}, tags);
            delete newTags[id];
            return newTags
        });
    }

    const ContainerHeight = 750;

    const editTag = (id, title, duration) => {
        //console.log(id)
        setTags(prev => {
            let newTags = Object.assign({}, tags);
            newTags[id].title = title;
            newTags[id].duration = duration;
            return newTags
        });
    }

    return (
        <Row>
            <Col span = {24}>
                <Row justify="center">
                    <Col>
                        <TagCreate CreateTag={CreateTag}/>
                    </Col>
                </Row>
                <Row>
                    <Col span = {24}>
                        {/* {Object.entries(tags).map(([id, item]) => (
                            <Tag key={id} title={item.title} duration={item.duration} id={id} onDelete={deleteTag}/>
                        ))} */}
                        <List
                            bordered="false"
                            //style={{height:"100vh"}}
                        >
                            <VirtualList
                                data={Object.entries(tags)}
                                height={ContainerHeight}
                                itemHeight={47}
                                itemKey="index"
                                //onScroll={onScroll}
                            >
                               {(item) => (
                                    <List.Item>
                                        <Tag key={item[0]} title={item[1].title} duration={item[1].duration} 
                                            id={item[0]} onDelete={deleteTag} onEdit={editTag} putTaginCalendar={putTaginCalendar}
                                        />
                                    </List.Item>
                               )}  
                            </VirtualList>
                        </List>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TagView;
