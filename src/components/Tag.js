import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
    Card, 
    Button, 
    Modal,
    Input,
    Form,
    Divider,
    DatePicker,
    TimePicker
} from 'antd';
import Meta from "antd/es/card/Meta";

const Tag = ({ title, duration, id, onDelete, onEdit, putTaginCalendar }) => {
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
    const [isModalOpenPut, setIsModalOpenPut] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    const showModalPut = () => {
        setIsModalOpenPut(true);
    };

    const handleCancelPut = () => {
        form1.resetFields()
        setIsModalOpenPut(false);
    };

    const onFinishPut = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        };
        //console.log(values['date-time-picker'])
        
        var time_arr = duration.split(":")
        var hours = parseInt(time_arr[0])
        var minutes = parseInt(time_arr[1])
        var date1 = new Date(values['date-time-picker'])

        date1.setHours(date1.getHours() + hours)
        date1.setMinutes(date1.getMinutes() + minutes)
        
        var mm = date1.getMonth() + 1; 
        var dd = date1.getDate();
        var dateStr = [date1.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
                ].join('-');
        var timeStr = date1.toString().split(' ')[4]

        //console.log(hours, minutes, dateStr+'T'+timeStr)

        putTaginCalendar(title, values['date-time-picker'].split(' ').join('T'), dateStr+'T'+timeStr)

        form1.resetFields()
        setIsModalOpenPut(false);
    };

    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    return (
        <>
            <Card style={{ marginLeft: "2.5%", width: '95%', marginTop: 5 }}
                hoverable={true}
                actions={[
                    <>
                        <Button type="text" icon={<PlusOutlined />} onClick={() => showModalPut()}/>,
                        <Modal title="Put the tag in calendar" open={isModalOpenPut} onOk={() => {
                            form1.validateFields().then(form1.submit)
                        }} onCancel={handleCancelPut}>
                            <Divider>
                                {title}
                            </Divider>
                            <Form id="eventTaskCreateForm" form={form1} name="time_related_controls" onFinish={onFinishPut}>
                                <Form.Item name="date-time-picker" label="start-time" {...config}>
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>,
                    
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
