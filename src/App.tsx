import { GlobalStyle } from '@/assets/styles/styled';
import { ErrorBoundary } from '@/components/bounday';
import { defaultTheme } from '@/config';
import { BaseRoutes } from '@/routes';
import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ErrorBoundary>
        <ThemeProvider theme={defaultTheme}>
          <BaseRoutes />
        </ThemeProvider>
        <GlobalStyle />
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);

export default App;
