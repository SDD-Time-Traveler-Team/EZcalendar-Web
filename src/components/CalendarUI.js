import React, {useState} from 'react'
import CalendarViewUI from "./CalendarViewUI";
import TagView from "./TagView";
import { Row, Col } from 'antd';

const CalendarUI = () => {

    return(
        <>
            <Row>
                <Col span = {5}>
                    <TagView />
                </Col>
                <Col span = {19}>
                    <CalendarViewUI />
                </Col>
            </Row>
        </>
    )
}

export default CalendarUI;
