import React from 'react'
import CalendarViewUI from "./CalendarViewUI";
import NavBar from './NavBar';
import Authentication from "../api/Authentication";

class CalendarUI extends React.Component {
    const [auth, setAuth] = useState(new Authentication());

    render() {
        return (
            <>
                <NavBar signOut={auth.signOut}/>
                <CalendarViewUI/>
            </>

        )
    }
}

export default CalendarUI;
