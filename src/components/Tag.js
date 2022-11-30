import React, { useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Button, Modal, Input, Form, Divider, DatePicker, TimePicker, Radio } from "antd";
import Meta from "antd/es/card/Meta";

const Tag = ({ title, duration, id, onDelete, onEdit, onAddToCalendar }) => {
    const config = {
        rules: [
            {
                type: "object",
                required: true,
                message: "Please select time",
            },
        ],
    };
    
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            "time-picker": fieldsValue["time-picker"].format("HH:mm"),
        };
        setEditModalOpen(false);
        onEdit(id, values.title, values["time-picker"]);
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [convertModalOpen, setConvertModalOpen] = useState(false);
    const [tagEditForm] = Form.useForm();
    const [eventOrTaskCreateForm] = Form.useForm();

    const handleCancel = () => {
        tagEditForm.resetFields();
        setEditModalOpen(false);
    };

    const handleCancelPut = () => {
        eventOrTaskCreateForm.resetFields();
        setConvertModalOpen(false);
    };

    const onFinishPut = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            "date-time-picker": fieldsValue["date-time-picker"].format("YYYY-MM-DD HH:mm:ss"),
        };

        let time_arr = duration.split(":");
        let hours = parseInt(time_arr[0]);
        let minutes = parseInt(time_arr[1]);
        let date1 = new Date(values["date-time-picker"]);

        date1.setHours(date1.getHours() + hours);
        date1.setMinutes(date1.getMinutes() + minutes);

        let mm = date1.getMonth() + 1;
        let dd = date1.getDate();
        let dateStr = [
            date1.getFullYear(),
            (mm > 9 ? "" : "0") + mm,
            (dd > 9 ? "" : "0") + dd,
        ].join("-");
        let timeStr = date1.toString().split(" ")[4];

        onAddToCalendar(
            id,
            title,
            values["date-time-picker"].split(" ").join("T"),
            dateStr + "T" + timeStr,
            isEvent
        );

        eventOrTaskCreateForm.resetFields();
        setConvertModalOpen(false);
    };

    const [isEvent, setIsEvent] = useState(true);

    return (
        <>
            <Card
                style={{ marginLeft: "2.5%", width: "95%", marginTop: 5 }}
                hoverable={true}
                actions={[
                    <>
                        <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={() => setConvertModalOpen(true)}
                        />
                        <Modal
                            title="Put the tag in calendar"
                            open={convertModalOpen}
                            onOk={() => {
                                eventOrTaskCreateForm
                                    .validateFields()
                                    .then(eventOrTaskCreateForm.submit);
                            }}
                            onCancel={handleCancelPut}
                        >
                            <Divider>{title}</Divider>
                            <Form
                                id="eventTaskCreateForm"
                                form={eventOrTaskCreateForm}
                                name="time_related_controls"
                                onFinish={onFinishPut}
                            >
                                <Form.Item name="date-time-picker" label="start-time" {...config}>
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                </Form.Item>
                                <Form.Item>
                                    <Radio.Group onChange={(e) => {setIsEvent(e.target.value)}} value={isEvent}>
                                        <Radio value={true}>Event</Radio>
                                        <Radio value={false}>Task</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>,

                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(id)}
                    />,
                    <>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => setEditModalOpen(true)}
                        />
                        <Modal
                            title="Edit the Tag"
                            open={editModalOpen}
                            onOk={() => {
                                tagEditForm.validateFields().then(tagEditForm.submit);
                            }}
                            onCancel={handleCancel}
                        >
                            <Form
                                id="tagCreateForm"
                                form={tagEditForm}
                                name="time_related_controls"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter a title",
                                        },
                                    ]}
                                    wrapperCol={{
                                        xs: {
                                            span: 0,
                                            offset: 0,
                                        },
                                        sm: {
                                            span: 16,
                                            offset: 0,
                                        },
                                    }}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item name="time-picker" label="Duration" {...config}>
                                    <TimePicker format="HH:mm" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>,
                ]}
            >
                <Meta title={title} description={duration} />
            </Card>
        </>
    );
};

export default Tag;
