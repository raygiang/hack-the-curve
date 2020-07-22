import React, {useState} from 'react';
import EventsList from './EventsList/EventsList';
import EventsCalendar from './EventsCalendar/EventsCalendar';
import './events-panel.scss';

function EventsPanel() {
    const [selectedDay, setSelectedDay] = useState(null);
    const currentDate = new Date();

    const getSelectedDayWhereClause = () => {
        let year = selectedDay.getFullYear();
        let month = selectedDay.getMonth();
        let day = selectedDay.getDate();
        let referenceStartDay = new Date(year, month, day, 0, 0, 0, 0);
        let referenceEndDay = new Date(year, month, day, 23, 59, 59, 999);

        return `{Start_Time_gte: "${referenceStartDay.toISOString()}", Start_Time_lte: "${referenceEndDay.toISOString()}"}`;
    }
    
    return (
        <div className="events-panel">
            <EventsCalendar setSelectedDay={setSelectedDay} />
            {selectedDay ? <EventsList selectedDay={selectedDay} whereClause={getSelectedDayWhereClause()} /> : null}
            <EventsList selectedDay={null} whereClause={`{End_Time_gte: "${currentDate.toISOString()}"}`} />
        </div>
    )
}

export default EventsPanel
