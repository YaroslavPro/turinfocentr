import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useHttp } from '../hooks/http.hook';

export const RatingWidget = ({ service, rated }) => {
    const votes = service.rating.reduce((sum, cur) => sum + cur);
    const ratingPoint = Math.round(service.rating.reduce((sum, cur, i) => sum + cur * ++i) / votes);
    const [point, setPoint] = useState(ratingPoint);
    const { request } = useHttp();
    const { dispatch } = useContext(AppContext);

    const calculatePoint = (width, position) => Math.ceil(position / Math.ceil(width / 5)) || 1;


    const handleMouseMove = event => {
        if (rated) return;

        setPoint(calculatePoint(event.currentTarget.clientWidth, event.nativeEvent.offsetX));
    }

    const handleMouseLeave = () => {
        setPoint(ratingPoint);
    }

    const handleClick = async event => {
        event.preventDefault();

        if (rated) return;

        const rate = calculatePoint(event.currentTarget.clientWidth, event.nativeEvent.offsetX);

        try {
            const rating = await request('/api/services/rate', 'POST', {
                id: service._id,
                rate
            });

            console.log('load rating:', rating);

            
            dispatch({
                type: 'update_service_rating',
                service,
                point: rate
            })
            
        } catch (e) { }


    }

    return (
        <span className={`showplace-rating ${rated ? 'rated' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            data-tooltip={'ваша оценка 5'}
        >
            <span className="showplace-rating-star"
                data-rating={point}
                style={{ width: `${point * 20}%` }}>
            </span>
        </span>
    );
}