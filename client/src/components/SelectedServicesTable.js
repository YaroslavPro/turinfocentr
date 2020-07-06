import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const SelectedServicesTable = ({ services }) => {
    const { state, dispatch } = useContext(AppContext);

    let totalCost = 0;

    const costCalculation = (service) => {
        let cost = service.isIndividual ?
            service.price * state.services.touristsCount
            : service.price;

        totalCost += cost;

        return cost;
    }

    return (
        <>
            <table className="widget-cart-table widget-cart-table-tour" >
                <tbody>
                    {[...services].map(service =>
                        <React.Fragment key={service._id}>
                            <tr>
                                <td>
                                    <a href="/turuslugi/servis86/" className="link">
                                        {service.title}
                                    </a>
                                </td>
                                <td>
                                    <span className="price">
                                        {costCalculation(service).toLocaleString('ru') }&nbsp;₽
                                    </span>
                                </td>
                                <td>
                                    <span className="del" onClick={() => {
                                        dispatch({ type: 'deselect_service', service });
                                    }}>{' '}</span>
                                </td>
                            </tr>
                        </React.Fragment>)}
                </tbody>
            </table>
            <div className="total">
                Итого:<span>{` ${totalCost.toLocaleString('ru')} ₽`}</span>
            </div>
        </>
    );
}