import React, { useContext } from 'react';
import { useModal } from 'react-modal-hook';
import { AppContext } from '../context/AppContext';
import { SelectedServicesTable } from '../components/SelectedServicesTable';
import DatePicker from 'react-datepicker';
import ReactModal from 'react-modal';
import { addDays } from 'date-fns'
import { ru } from 'date-fns/locale';
import { CountField } from '../components/CountField';
import { ReservationForm } from '../components/ReservationForm'

export const SelectedServices = () => {
    const { state, dispatch } = useContext(AppContext);

    const [showModal, hideModal] = useModal(() => (
        <ReactModal className="modal-dialog" isOpen ariaHideApp={false}>
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={hideModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Отправить запрос</h4>
                </div>
                <div className="modal-body">
                    <ReservationForm />
                </div>
                <div className="modal-footer">
                    <p className="text-left">
                        <small>
                            Обязательные поля отмечены <b>*</b>
                        </small>
                    </p>
                    <p className="text-left">
                        <small>
                            Продолжая, Вы соглашаетесь с нашими <u>Условиями использования</u> и подтверждаете, что прочли наше <u>Положение о конфиденциальности</u> и использовании файлов cookie.
                        </small>
                    </p>
                </div>
            </div>
        </ReactModal>
    ));

    return (
        <div>
            <div className="sidebar-widget services">
                <div className="sidebar-widget-img">
                    <img src="/img/reserv50.png" alt="" />
                </div>
                <div className="sidebar-widget-title">
                    {state.services.selected.size ? 'РАСЧЁТ ТУРА НА ГРУППУ' : 'РАСЧЁТ ТУРА'}
                </div>

                {state.services.selected.size ?
                    <>
                        <div className="widget-tour-order-title">
                            <CountField
                                count={state.services.touristsCount}
                                increment={() => dispatch({ type: 'increment_tourists_count' })}
                                decrement={() => dispatch({ type: 'decrement_tourists_count' })}
                                className="in-sidebar"
                            />

                            <DatePicker
                                selected={state.services.startDate}
                                selectsStart
                                onChange={date => {
                                    dispatch({ type: 'set_start_date', date })
                                }}
                                startDate={state.services.startDate}
                                endDate={state.services.endDate}
                                minDate={addDays(new Date(), 1)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Время"
                                dateFormat="Приезд d MMMM в HH:mm"
                                className="form-control text-center input-sm"
                                placeholderText="Укажите дату приезда"
                                locale={ru}
                                withPortal
                            />

                            <DatePicker
                                selected={state.services.endDate}
                                selectsEnd
                                onChange={date => dispatch({ type: 'set_end_date', date })}
                                startDate={state.services.startDate}
                                endDate={state.services.endDate}
                                minDate={state.services.startDate || addDays(new Date(), 1)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Время"
                                dateFormat="Отъезд d MMMM в HH:mm"
                                className="form-control text-center input-sm"
                                placeholderText="Укажите дату отъезда"
                                locale={ru}
                                withPortal
                            />
                        </div>

                        <SelectedServicesTable services={state.services.selected} />

                        {state.services.startDate && state.services.endDate &&
                            <div>
                                <button
                                    type="button"
                                    className="btn ads-add"
                                    onClick={showModal}
                                    disabled={state.services.isSent}
                                >
                                    {state.services.isSent ? 'ЗАПРОС ОТПРАВЛЕН' : 'ЗАПРОС БРОНИ'}
                                </button>
                            </div>
                        }
                    </>
                    :
                    <>
                        <div className="widget-org-text">Выбирайте туруслуги для расчета стоимости и бронирования</div>
                    </>
                }


            </div>
        </div>
    );
}