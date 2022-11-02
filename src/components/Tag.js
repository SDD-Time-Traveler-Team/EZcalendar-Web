import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
    Card, Button, Modal,
    Input,
    Form,
    TimePicker,
} from 'antd';
import Meta from "antd/es/card/Meta";

const Tag = ({ title, duration, id, onDelete, onEdit }) => {
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Please select time',
            },
        ],
    };


    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'time-picker': fieldsValue['time-picker'].format('HH:mm'),
        };
        setIsModalOpen(false);
        onEdit(id, values.title, values["time-picker"])
        //console.log('Received values of form: ', values);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();

    return (
        <>
            <Card style={{ marginLeft: "2.5%", width: '95%', marginTop: 5 }}
                hoverable={true}
                actions={[
                    <Button type="text" icon={<PlusOutlined />} />,
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(id)} />,
                    <>
                        <Button type="text" icon={<EditOutlined />} onClick={() => showModal()} />,
                        <Modal title="Edit the Tag" open={isModalOpen} onOk={() => {
                            form.validateFields().then(form.submit)
                        }} onCancel={handleCancel}>
                            <Form id="tagCreateForm" form={form} name="time_related_controls" onFinish={onFinish}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[{
                                        required: true,
                                        message: "Please enter a title"
                                    }]}
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
                    </>

                ]}>
                <Meta title={title}
                    description={duration} />
            </Card>
        </>
    );
};
export default Tag;
