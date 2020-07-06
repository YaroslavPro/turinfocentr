import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useHttp } from '../hooks/http.hook';
import { BarLoader } from "react-spinners";
import { Formik, Form, Field } from 'formik';
import { TextField, PhoneField } from '../components/FormikFields';
import { ValidationError, transformApiErrors } from '../errors';
import * as Yup from 'yup';


export const ReservationForm = () => {
    const { state, dispatch } = useContext(AppContext);
    const { request, loading } = useHttp();

    const handleSubmit = async (values, { setErrors }) => {
        try {
            const { startDate, endDate, touristsCount, selected } = state.services;

            const user = await request('/api/services/reserve', 'POST', {
                services: [...selected].map(service => service.title),
                startDate,
                endDate,
                touristsCount,
                ...values
            });

            dispatch({ type: 'update_user', user });
        } catch (e) {
            if (e instanceof ValidationError) {
                setErrors(transformApiErrors(e.data));
            }
        }
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Пожалуйста, введите корректный email')
            .required('Пожалуйста, укажите email'),
        phone: Yup.string()
            .transform(value => value.replace(/\D+/g, ''))
            .required('Пожалуйста, укажите номер телефона')
            .length(10, 'Пожалуйста, введите корректный номер'),
        client: Yup.string()
            .required('Пожалуйста, укажите имя'),
        company: Yup.string()
            .max(100, 'Название не должно превышать 100 знаков'),
        comment: Yup.string()
            .max(250, 'Комментарий не должен превышать 250 знаков'),
    });

    return (
        <Formik
            initialValues={state.user}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="row">
                    <TextField
                        label="Ваш e-mail"
                        name="email"
                        type="email"
                        className="col-sm-6 required"
                    />
                    <PhoneField
                        label="Ваш телефон"
                        name="phone"
                        className="col-sm-6 required"
                    />
                </div>
                <div className="row" >
                    <TextField
                        label="Как вас зовут?"
                        name="client"
                        className="col-sm-6 required" />
                    <TextField
                        label="Организация"
                        name="company"
                        placeholder="Для частного лица оставьте пустым"
                        className="col-sm-6"
                    />
                </div>
                <div className="row" >
                    <TextField
                        label="Вопросы и комментарии"
                        name="comment"
                        className="col-sm-12"
                    />
                </div>
                <div className="checkbox">
                    <label>
                        <Field
                            type="checkbox"
                            name="subscription"
                        /> Подписаться на рассылку о новых услугах для туристов
                    </label>
                </div>
                <div className="form-group text-right">
                    <BarLoader width={'100%'} color={"#008d3f"} loading={loading} />
                    {!loading &&
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={state.services.isSent}
                        >
                            {state.services.isSent ? 'ЗАПРОС ОТПРАВЛЕН' : 'ОТПРАВИТЬ'}
                        </button>
                    }
                </div>
            </Form>
        </Formik>
    );
}