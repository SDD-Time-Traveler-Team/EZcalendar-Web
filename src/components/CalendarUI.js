import React from 'react'
import WeeklyViewUI from "./WeeklyViewUI";
import MonthlyViewUI from "./MonthlyViewUI";

class CalendarUI extends React.Component {
        state = {view:'weekly'};

        render() {
            return(<>
                    <WeeklyViewUI/>
                    <MonthlyViewUI/>
            </>

            )
        }
}

export default CalendarUI;
