import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';
import { useRoutes } from './routes';
import { TopPanel } from './components/TopPanel';
import { HeaderBlock } from './components/HeaderBlock';
import { FooterBlock } from './components/FooterBlock';
import { appReducer, initialState } from './reducer';
import { AppContext } from './context/AppContext';


function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const routes = useRoutes();

  return (
    <AppContext.Provider value={{ state, dispatch }}>

      <ModalProvider>

        <TopPanel />
        <HeaderBlock />
        <Router>
          {routes}
        </Router>
        <FooterBlock />

      </ModalProvider>

    </AppContext.Provider>
  );
}

export default App;
