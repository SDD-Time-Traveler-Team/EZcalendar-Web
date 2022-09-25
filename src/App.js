import './App.css';
import './component/fullcalendar'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";

function App() {
  return (
      <>
          <body>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />
          </body>
      </>
  );
}

export default App;
