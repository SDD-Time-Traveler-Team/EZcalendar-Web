import React, {useEffect, useState} from "react";
import {Row, Col, List} from "antd";
import TagCreate from "./TagCreate";
import Tag from "./Tag";
import Authentication from "../utils/Authentication";
import {getAllTags, createTag, updateTag, deleteTag, createEvent, createTask} from "../utils/Database";
import VirtualList from "rc-virtual-list";

const TagMenu = ({setEvents, setTasks}) => {
    const auth = new Authentication();
    const [tags, setTags] = useState([]); // tag: {id, title, duration}

    //fetch user's tags from server upon entering calendar page
    useEffect(() => {
        getAllTags(auth.email)
            .then((res) => {
                setTags((prev) =>
                    res.data.map((tag) => ({
                        id: tag.id,
                        title: tag.title,
                        duration: tag.duration_in_minutes,
                    }))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //handle creating tag in the tag section
    const onCreateTag = (tagTitle, tagDuration) => {
        const durationInMinutes = toMinutes(tagDuration);

        createTag(auth.email, tagTitle, durationInMinutes)
            .then((res) => {
                setTags((prev) => [
                    ...prev,
                    {
                        id: res.data.id,
                        title: tagTitle,
                        duration: durationInMinutes,
                    },
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //handle editing tag in the tag section
    const onEditTag = (id, title, durationInHoursAndMinutes) => {
        const durationInMinutes = toMinutes(durationInHoursAndMinutes);

        updateTag(auth.email, id, title, durationInMinutes)
            .then((res) => {
                setTags((prev) =>
                    prev.map((tag) => {
                        if (tag.id === id) {
                            return {
                                id: id,
                                title: title,
                                duration: durationInMinutes,
                            };
                        } else {
                            return tag;
                        }
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //handle deleting tag in the tag section
    const onDeleteTag = (id) => {
        deleteTag(auth.email, id)
            .then((res) => {
                setTags((prev) => prev.filter((tag) => tag.id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //handle adding tags to the calendar from tag section
    const onAddToCalendar = (tag_id, title, startTime, endTime, isEvent) => {
        //TODO: connect db

        // events {id, title, tagId, startTime, endTime}
        // tasks {id, title, tagId, startTime, endTime, completed}

        if (isEvent) {
            createEvent(auth.email, title, tag_id, "", startTime, endTime)
                .then((res) => {
                    setEvents((prev) => [
                        ...prev,
                        {
                            id: res.data.id,
                            tagId: res.data.tag_id,
                            title: res.data.title,
                            start: res.data.start_time,
                            end: res.data.end_time
                        },
                    ]);
                }).catch((err) => {
                console.log(err);
            })

        } else {
            createTask(auth.email, title, tag_id, "", startTime, endTime, false)
                .then((res) => {
                    setTasks((prev) => [
                        ...prev,
                        {
                            id: res.data.id,
                            tagId: res.data.tag_id,
                            title: res.data.title,
                            start: res.data.start_time,
                            end: res.data.end_time,
                            completed: res.data.completed
                        },
                    ]);
                }).catch((err) => {
                    console.log(err)
            })
        }
    };

    //convert minutes to hours and minutes
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const hoursStr = hours < 10 ? `0${hours}` : hours.toString();
        const minutes = totalMinutes % 60;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
        return hoursStr + ":" + minutesStr;
    };

    //convert hours and minutes to minutes
    const toMinutes = (hoursAndMinutes) => {
        const splitDuration = hoursAndMinutes.split(":");
        const durationInMinutes = parseInt(splitDuration[0]) * 60 + parseInt(splitDuration[1]);
        return durationInMinutes;
    };

    return (
        <Row>
            <Col span={24}>
                <Row justify="center">
                    <Col>
                        <TagCreate CreateTag={onCreateTag}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <List bordered="false">
                            <VirtualList
                                data={Object.entries(tags)}
                                height={750}
                                itemHeight={47}
                                itemKey="index"
                            >
                                {(item) => (
                                    <List.Item>
                                        <Tag
                                            key={item[0]}
                                            title={item[1].title}
                                            duration={toHoursAndMinutes(item[1].duration)}
                                            id={item[1].id}
                                            onDelete={onDeleteTag}
                                            onEdit={onEditTag}
                                            onAddToCalendar={onAddToCalendar}
                                        />
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default TagMenu;
