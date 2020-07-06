import React, { useCallback, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { TopEventSlider } from './TopEventSlider';


export const TopPanel = () => {
    const [events, setEvents] = useState([]);
    const { loading, request } = useHttp();

    const fetchEvents = useCallback(async () => {
        try {
            const fetched = await request('/api/events', 'GET', null, {});
            setEvents(fetched);
        } catch (e) { }

    }, [request]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    
    return (
        <div className="customnewspanel-top">
            <div className="container">
                <div className="customnewspanel-row">
                    <div className="customnewspanel-title-wrapp">
                        <div className="customnewspanel-title">
                            <a href="/region/" className="title">
                                <span>Тверская область</span>
                            </a>
                        </div>
                    </div>
                    {!loading && events.length && <TopEventSlider events={events} interval='3' />}
                    <div className="menu-toggle-wrapp">
                        <div className="menu-toggle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
};