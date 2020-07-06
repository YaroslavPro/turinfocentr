import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ImageGallery from 'react-image-gallery';


export const ServiceDetail = ({ service }) => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <>

            <Link to={'/'} className="back-link">Назад к списку</Link>

            <div className="article-head clearfix">

                <div className="article-head-img card-head-img">
                    <div className="article-slider-wrapp">
                        <div className="article-slider">
                            <div className="article-slide">

                                <ImageGallery
                                    items={service.images}
                                    showThumbnails={false}
                                    showNav={false}
                                    useBrowserFullscreen={false}
                                    showPlayButton={false}
                                    autoPlay={true}
                                />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="article-head-desc">
                    <div className="article-head-title">
                        <h3 className="title">{service.title}</h3>
                        <div className="tour-price">
                            <div className="price">
                                {service.price} ₽
                                <span className="man">{' / '}
                                    {service.isIndividual ?
                                        'ЗА 1 ЧЕЛ'
                                        :
                                        `ЗА ГРУППУ (до ${service.quota} чел)`
                                    }
                                </span>
                                <button
                                    className="btn-add reserv"
                                    disabled={!!state.services.selected.has(service)}
                                    onClick={() => dispatch({ type: 'select_service', service })}
                                >ДОБАВИТЬ В РАСЧЁТ</button>
                            </div>
                        </div>
                    </div>
                    <div className="article-head-info">
                        <table className="article-info-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="article-info-title">
                                            <i className="article-info-icon-1"></i>&nbsp;
                                        </div>
                                    </td>
                                    <td>{service.location}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="article-info-title">
                                            <i className="article-info-icon-8"></i>&nbsp;
                                        </div>
                                    </td>
                                    <td>{service.duration} час</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="article-info-title">
                                            <i className="article-info-icon-3"></i>&nbsp;
                                        </div>
                                    </td>
                                    <td>{service.shedule || 'не задано'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="article-text" dangerouslySetInnerHTML={{ __html: service.content }} ></div>
        </>
    )
};