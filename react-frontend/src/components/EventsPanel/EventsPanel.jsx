import React from 'react';
import EventsList from './EventsList/EventsList';
import './events-panel.scss';

function EventsPanel() {
    return (
        <div className="events-panel">
            <EventsList />
        </div>
    )
}

export default EventsPanel
