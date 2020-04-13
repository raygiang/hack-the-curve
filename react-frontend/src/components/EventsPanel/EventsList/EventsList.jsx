import React, {useState} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import EventCard from './EventCard/EventCard';
import './events-list.scss';

const currentDate = new Date();

const GET_EVENTS = gql`
        query {
            events(where: {End_Time_gte: "${currentDate.toISOString()}"},
            sort: "Start_Time") {
            Name
            Start_Time
            }
        }
    `;

/**
 * The container component for upcoming events
 */ 
function EventsList() {
    const [eventList, setEventList] = useState(null);
    const {loading, error, data} = useQuery(GET_EVENTS);

    /**
     * Maps the events stored in data to Event components. Update the EventList state with the result.
     */ 
    const mapEvents = () => {
        const events = data.events.map((event, index) => (
            <EventCard
                key={index}
                id={event.id}
                name={event.Name}
                description={event.Description}
                startTime={event.Start_Time}
                endTime={event.End_Time}
                featureImage={event.Feature_Image}
                altTag={event.Alt_Tag}
            />
        ));
        setEventList(events);
    }

    if(error) {
        return (
            <div>Error Retrieving Data</div>
        )
    }
    else if(!eventList) {
        if(!loading) mapEvents();
        return (
            <div>Loading...</div>
        )
    }

    return (
        <section className="events-list">
            <h2 className="events-list__heading">Current and Upcoming Events</h2>
            {eventList}
        </section>
    )
}

export default EventsList
