import React from 'react';
import './event-card.scss';

function EventCard(props) {
    const {name, startTime} = props;
    const startDate = new Date(startTime);
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('default', { month: 'short' });

    return (
        <a href="https://cityaxess.axesscreative.ca" className="event-card" title={name}>
            <h3 className="event-card__name">{name.length < 20 ? name : name.substring(0, 20) + "..."}</h3>
            <span className="event-card__date">{startMonth + " " + startDay}</span>
        </a>
    )
}

export default EventCard
