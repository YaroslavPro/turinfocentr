import { createContext } from 'react';

function noop() { };

export const AppContext = createContext({
    state: null,
    dispatch: noop
});