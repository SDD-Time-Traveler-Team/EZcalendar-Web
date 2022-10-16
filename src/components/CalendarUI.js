import React from 'react'
import CalendarViewUI from "./CalendarViewUI";
import NavBar from './NavBar';

class CalendarUI extends React.Component {

        render() {
            return(
            <>
                <NavBar/>
                <CalendarViewUI/>
            </>

            )
        }
}

export default CalendarUI;
