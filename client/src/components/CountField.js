import React from 'react';

export const CountField = ({ count, increment, decrement, className='' }) => {

    const declension = (num) => {
        let part = +num.toString().slice(-2);
        part > 20 && (part = (part % 10));
        return ((part < 2 || part > 4) ? ' человек' : ' человека');
    }

    return (
        <>
            <div className={`input-group ${className}`}>
                <span className="input-group-addon" onClick={() => decrement()}>
                    <i className="glyphicon glyphicon-minus"></i>
                </span>
                <div className="form-control text-center">
                    {`${count} ${declension(count)}`}
                </div>
                <span className="input-group-addon" onClick={() => increment()}>
                    <i className="glyphicon glyphicon-plus"></i>
                </span>
            </div>
            <span className="help-block"></span>
        </>
    );
}