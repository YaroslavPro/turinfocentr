export const initialState = {
    services: {
        isSent: false,
        startDate: null,
        endDate: null,
        touristsCount: 5,
        filter: null,
        selected: new Set(),
        categories: new Set(),
        fetched: new Map(),
        rated: new Map(Object.entries(JSON.parse(localStorage.getItem('rated')) || {}))
    },
    user: {
        email: '',
        phone: '',
        client: '',
        company: '',
        comment: '',
        subscription: false
    }
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case 'update_user':
            return {
                ...state,
                services: {
                    ...state.services,
                    isSent: true
                },
                user: action.user
            };
        case 'filter_services':
            return {
                ...state,
                services: {
                    ...state.services,
                    filter: action.category
                }
            };
        case 'update_service_rating':

            let rating = action.service.rating;
            let pointVotes = rating[action.point - 1];
            rating[action.point - 1] = ++pointVotes;

            state.services.rated.set(action.service._id, action.point);

            localStorage.setItem('rated', JSON.stringify(Object.fromEntries(state.services.rated.entries())));

            return {
                ...state
            };
        case 'set_fetched_services':
            action.fetched.forEach(servis => {
                state.services.fetched.set(servis.alias, servis);
                state.services.categories.add(servis.category);
            });
            return {
                ...state
            };
        case 'increment_tourists_count':
            return {
                ...state,
                services: {
                    ...state.services,
                    touristsCount: state.services.touristsCount + 1
                }
            };
        case 'decrement_tourists_count':
            return {
                ...state,
                services: {
                    ...state.services,
                    touristsCount: state.services.touristsCount - 1 || state.services.touristsCount
                }
            };
        case 'set_start_date':
            return {
                ...state,
                services: {
                    ...state.services,
                    startDate: action.date,
                    endDate: state.services.endDate < state.services.startDate ? null : state.services.endDate
                }
            };
        case 'set_end_date':
            return {
                ...state,
                services: {
                    ...state.services,
                    endDate: action.date
                }
            };
        case 'select_service':
            return {
                ...state,
                services: {
                    ...state.services,
                    selected: state.services.selected.add(action.service)
                }
            };
        case 'deselect_service':
            state.services.selected.delete(action.service);

            return {
                ...state
            };
        default:
            return state
    }
}
