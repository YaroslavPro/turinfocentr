import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { RatingWidget } from '../components/RatingWidget';

export const ServiceBlock = ({ service }) => {
    const { state, dispatch } = useContext(AppContext);
    const link = `/${service.alias}`;

    return (
        <div className="showplace-col col-md-6 col-sm-6 col-xs-6">
            <div className="showplace-block">
                <Link to={link} className="showplace-img">
                    <img src={service.cover} alt={service.title} />
                    <RatingWidget
                        service={service}
                        rated ={state.services.rated.has(service._id)}
                    />
                </Link>
                <div className="showplace-desc">
                    <h3 className="showplace-title">
                        <Link to={link}>{service.title}</Link>
                    </h3>
                    <div className="showplace-text">
                        {service.description}
                        <Link to={link} className="more">узнать больше</Link>
                    </div>
                    <div className="showplace-info clearfix">
                        <div className="day-num"><i className="showplace-icon-5"></i>{service.duration} час</div>
                        <div className="price-block-man">
                            <span className="price">{service.price} <span className="rub">₽</span></span>
                            <span className="man">/ {service.isIndividual ? 'ЧЕЛ' : 'ГРУППА'}</span>
                        </div>
                        <button
                            className="btn-add reserv"
                            disabled={!!state.services.selected.has(service)}
                            onClick={() => dispatch({ type: 'select_service', service })}
                        >ДОБАВИТЬ В РАСЧЁТ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}