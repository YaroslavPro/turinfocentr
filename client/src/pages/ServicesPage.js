import React, { useContext, useEffect, useCallback } from 'react';
import { TwoColumnLayout } from '../components/TwoColumnLayout';
import { SidebarInfoBlock } from '../components/SidebarInfoBlock';
import { SelectedServices } from '../components/SelectedServices';
import { CategorySelector } from '../components/CategorySelector';
import { ServiceBlock } from '../components/ServiceBlock';
import { ServiceDetail } from '../components/ServiceDetail';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { BarLoader } from "react-spinners";

export const ServicesPage = () => {
    const { state, dispatch } = useContext(AppContext);
    const { request, loading } = useHttp();
    const id = useParams().id;

    const fetchServices = useCallback(async () => {
        try {
            const fetched = await request('/api/services', 'GET', null, {});
            dispatch({ type: 'set_fetched_services', fetched });
        } catch (e) { }
    }, [request, dispatch]);

    useEffect(() => {
        if (!state.services.fetched.length) {
            fetchServices();
        }

    }, [fetchServices, state.services.fetched.length]);

    return (
        <TwoColumnLayout
            frame={!!id}
            title="Туруслуги"
            selector={
                <CategorySelector
                    all='Все'
                    categories={state.services.categories}
                    value={state.services.filter}
                    change={category => dispatch({ type: 'filter_services', category })}
                />
            }
            sidebar={
                <>
                    <SelectedServices />
                    <SidebarInfoBlock />
                </>
            }
        >

            <BarLoader
                width={'100%'}
                color={"#008d3f"}
                loading={loading}
            />

            {id ?
                <>
                    {state.services.fetched.has(id) &&
                        <ServiceDetail
                            service={state.services.fetched.get(id)}
                        />
                    }
                </>
                :
                <div className="showplace-wrapp">
                    <div className="row">
                        {state.services.fetched &&
                            <>
                                {[...state.services.fetched.values()]
                                    .filter(service =>
                                        !state.services.filter || service.category === state.services.filter
                                    )
                                    .map((service, i) =>
                                        <ServiceBlock
                                            key={service._id}
                                            service={service}
                                        />
                                    )
                                }
                            </>
                        }
                    </div>
                </div>
            }
        </TwoColumnLayout>
    );
}