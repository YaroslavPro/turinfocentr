import React from 'react';

export const TopEventSlide = ({ event }) => {
    return (
        <>
            <a href={event.cityLink} className="customnewspanel-slide-title">{event.city}:</a>
            <a href={event.link} className="customnewspanel-slide-mess">
                <b>{event.title}</b>
                {event.description}
            </a>
            <a href={event.link} className="customnewspanel-slide-link">...</a>
        </>
    )
};