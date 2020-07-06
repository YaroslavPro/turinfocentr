import React from 'react';
import { useField } from 'formik';
import MaskedField from 'react-masked-field';


export const TextField = ({ label, className = '', ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div
            className={`form-group ${className} ${
                meta.touched ? meta.error ? 'has-error' : 'has-success' : ''
                }`
            }
        >
            <label>{label}</label>
            <input {...field} {...props} className="form-control" autoComplete="off" />
            <span className="help-block">{meta.error}</span>
        </div>
    );
};

export const PhoneField = ({ label, className = '', ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div
            className={`form-group ${className} ${
                meta.touched ? meta.error ? 'has-error' : 'has-success' : ''
                }`
            }
        >
            <label htmlFor="phone">{label}</label>
            <div className="input-group">
                <span className="input-group-addon">+7</span>
                <MaskedField {...field} mask="(999) 999-99-99" className="form-control" />
            </div>
            <span className="help-block">{meta.error}</span>
        </div>
    );
}
