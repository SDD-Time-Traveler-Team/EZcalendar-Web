import React, { useState } from 'react';
import {
    Modal,
    Button,
    Input,
    Radio,
    Form,
    TimePicker,
    Cascader,
    InputNumber,
    Select,
    Switch,
    TreeSelect,
    DatePicker,

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

const TagCreate = () => {

    const [value, setValue] = useState(1);
    var inputtitle = "";
    var inputduration = ""

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (fieldsValue) => {
        const rangeValue = fieldsValue['range-picker'];
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
            'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
            'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
            'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
            'range-time-picker': [
            rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
            rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
            ],
            'time-picker': fieldsValue['time-picker'].format('HH:mm'),
        };
        console.log('Received values of form: ', values);
    };
    const [form] = Form.useForm();
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Tag
            </Button>
            <Modal title="Create a tag" open={isModalOpen} onOk={() => {
                form
                .validateFields().then(handleOk)}} onCancel={handleCancel}>
                <Form form={form} name="time_related_controls" onFinish={onFinish}>
                    {/*<Form.Item>*/}
                    {/*    <Radio.Group onChange={onChange} value={value}>*/}
                    {/*        <Radio value={1}>*/}
                    {/*            Event*/}
                    {/*        </Radio>*/}
                    {/*        <Radio value={2}>*/}
                    {/*            To-do*/}
                    {/*        </Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Form.Item>*/}

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
                    {/*<Form.Item*/}
                    {/*    label="Description"*/}
                    {/*    wrapperCol={{*/}
                    {/*        xs: {*/}
                    {/*            span: 0,*/}
                    {/*            offset: 0,*/}
                    {/*        },*/}
                    {/*        sm: {*/}
                    {/*            span: 15,*/}
                    {/*            offset: 0,*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Input.TextArea/>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};

export default TagCreate;
