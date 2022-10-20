import React from 'react'
import CalendarViewUI from "./CalendarViewUI";
import TagView from "./TagView";
import { Row, Col } from 'antd';

class CalendarUI extends React.Component {

        render() {
            return(
            <>
                <Row>
                    <Col span = {6}>
                        <TagView/>
                    </Col>
                    <Col span = {18}>
                        <CalendarViewUI/>
                    </Col>
                </Row>
            </>

            )
        }
}

export default CalendarUI;
