import React, {useState} from 'react';
import {
    Modal,
    Button,
    Input,
    Form,
    TimePicker
} from 'antd';

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time',
        },
    ],
};

const TagCreate = ({CreateTag}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'time-picker': fieldsValue['time-picker'].format('HH:mm'),
        };
        setIsModalOpen(false);
        CreateTag(values.title, values["time-picker"])
    };

    return (
        <>
            <Button type="primary" size="large" onClick={showModal}>
                Create Tag
            </Button>
            <Modal
                title="Create a tag"
                open={isModalOpen}
                onOk={() => form.validateFields().then(form.submit)}
                onCancel={handleCancel}
            >
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
                        <Input/>
                    </Form.Item>

                    <Form.Item name="time-picker" label="Duration" {...config}>
                        <TimePicker format="HH:mm"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default TagCreate;
