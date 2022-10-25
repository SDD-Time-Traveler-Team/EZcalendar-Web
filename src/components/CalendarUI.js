import React from 'react'
import CalendarViewUI from "./CalendarViewUI";
import TagView from "./TagView";
import { Row, Col } from 'antd';

class CalendarUI extends React.Component {

        render() {
            return(
            <>
                <Row>
                    <Col span = {5}>
                        <TagView/>
                    </Col>
                    <Col span = {19}>
                        <CalendarViewUI/>
                    </Col>
                </Row>
            </>

            )
        }
}

export default CalendarUI;
