import React, {useState} from 'react';
import Calendar from 'react-calendar';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './events-calendar.scss';

function EventsCalendar(props) {
    const {setSelectedDay} = props;
    const [date, setDate] = useState(new Date());
    const displayedYear = date.getFullYear();
    const displayedMonth = date.getMonth();
    const displayedMonthEndDay = new Date(displayedYear, displayedMonth + 1, 0).getDate();

    let referenceStartDay = new Date(displayedYear, displayedMonth, 1, 0, 0, 0, 0);
    let referenceEndDay = new Date(displayedYear, displayedMonth, displayedMonthEndDay, 23, 59, 59, 999);

    const GET_CURRENT_MONTH_EVENTS = gql`
        query {
            events(where: {Start_Time_gte: "${referenceStartDay.toISOString()}", Start_Time_lte: "${referenceEndDay.toISOString()}"}) {
                Start_Time
            }
        }
    `;

    const {loading, error, data} = useQuery(GET_CURRENT_MONTH_EVENTS);

    const changeDay = (newDay) => {
        setSelectedDay(newDay);
    }

    const checkDisableCell = ({date, view}) => {
        if(view !== "month") {return false};

        for(let event of data.events) {
            let eventDate = new Date(event.Start_Time);
            if(date && date.getDate() === eventDate.getDate()) return false;
        }

        return true;
    }

    if(error) {
        return (
            <div>Error Retrieving Data</div>
        )
    }
    else if(loading && !data) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <Calendar
            onChange={changeDay}
            value={date}
            showNeighboringMonth={false}
            onActiveStartDateChange={({activeStartDate})=>{setDate(activeStartDate)}}
            tileDisabled={checkDisableCell}
        />
    )
}

export default EventsCalendar
