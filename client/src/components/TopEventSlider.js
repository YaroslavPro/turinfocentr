import React, { useEffect, useState } from 'react';
import { TopEventSlide } from './TopEventSlide';



export const TopEventSlider = ({ events, interval }) => {
    const [slide, setSlide] = useState(0);
    const [pause, setPause] = useState(false);

    function stop() {
        setPause(true);
    }

    function start() {
        setPause(false);
    }

    useEffect(() => {
        let timer = null;
        if (!pause) {
            timer = setInterval(() => {
                setSlide(slide => (slide < events.length - 1) ? slide + 1 : 0);
            }, interval * 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [slide, pause, events, interval]);


    return (
        <div className="customnewspanel-slider">
            <div className="customnewspanel-slide">
                <div className="customnewspanel-slide-wrapp">
                    <div className="customnewspanel-slide-cell" onMouseOver={stop} onMouseOut={start} >
                        <TopEventSlide event={events[slide]} />
                    </div>
                </div>
            </div>
        </div>
    )
};