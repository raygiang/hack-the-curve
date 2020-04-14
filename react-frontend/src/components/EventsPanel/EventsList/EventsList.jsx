import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import EventCard from './EventCard/EventCard';
import './events-list.scss';

/**
 * The container component for upcoming events
 */ 
function EventsList(props) {
    const {selectedDay, whereClause} = props;
    const heading = selectedDay ? 
            "Events on " + selectedDay.toLocaleString('default', { month: 'short' }) + " " + selectedDay.getDate() + " " + selectedDay.getFullYear(): 
            "Current and Upcoming Events";
    const limitString = selectedDay ? '' : ', limit: 5';
    let renderedEvents;

    console.log(`
    query {
        events(where: ${whereClause},
        sort: "Start_Time" ${limitString}) {
            Name
            Start_Time
        }
    }
`);
    const GET_EVENTS = gql`
        query {
            events(where: ${whereClause},
            sort: "Start_Time" ${limitString}) {
                Name
                Start_Time
            }
        }
    `;

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
        renderedEvents = events;
    }

    if(error) {
        return (
            <section className="events-list">
                <div>Error Retrieving Data</div>
            </section>
        )
    }

    if(loading & !data) {
        return (
            <section className="events-list">
                <div>Loading...</div>
            </section>
        )
    }

    mapEvents();

    return (
        <section className="events-list">
            <h2 className="events-list__heading">{heading}</h2>
            {renderedEvents}
        </section>
    )
}

export default EventsList
