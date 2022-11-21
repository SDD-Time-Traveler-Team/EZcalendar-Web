import React, {useEffect, useState} from "react";
import {Row, Col, List} from "antd";
import TagCreate from "./TagCreate";
import Tag from "./Tag";
import Authentication from "../utils/Authentication";
import {getAllTags, createTag, updateTag, deleteTag} from "../utils/Database";
import VirtualList from "rc-virtual-list";

const TagMenu = ({setEvents, setTasks}) => {
    const auth = new Authentication();
    const [tags, setTags] = useState([]); // tag: {id, title, duration}

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

    const onDeleteTag = (id) => {
        deleteTag(auth.email, id)
            .then((res) => {
                setTags((prev) => prev.filter((tag) => tag.id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onAddToCalendar = (tag_id, title, startTime, endTime, isEvent) => {
        //TODO: connect db
        const id = (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "")

        // events {id, title, tagId, startTime, endTime}
        // tasks {id, title, tagId, startTime, endTime, completed}

        if (isEvent) {
            setEvents((prev) => [
                ...prev,
                {
                    id: id,
                    tagId: tag_id,
                    title: title,
                    start: startTime,
                    end: endTime
                },
            ]);
        } else {
            setTasks((prev) => [
                ...prev,
                {
                    id: id,
                    tagId: tag_id,
                    title: title,
                    start: startTime,
                    end: endTime,
                    completed: false
                },
            ]);
        }
    };

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const hoursStr = hours < 10 ? `0${hours}` : hours.toString();
        const minutes = totalMinutes % 60;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
        return hoursStr + ":" + minutesStr;
    };

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
