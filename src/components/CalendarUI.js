import React from 'react'
import CalendarViewUI from "./CalendarViewUI";
import Authentication from "../api/Authentication";
import { Navigate } from 'react-router-dom';

class CalendarUI extends React.Component {

    render() {
        var temp = new Authentication();
        console.log("in calUI",temp.user)
        if(temp.user != null){
            return (
                <>
                    <CalendarViewUI/>
                </>
    
            )
        }
        else{
            return(
                <>
                    <Navigate to ="/login"/>
                </>
            )
        }
    }
}

export default CalendarUI;
