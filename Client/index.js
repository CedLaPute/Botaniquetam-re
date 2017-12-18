import React from "react"
import { AppRegistry } from 'react-native';
import App from './js/App';

import { Provider } from 'react-redux'
import configureStore from './js/store/configureStore'


const store = configureStore()




const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)


AppRegistry.registerComponent('zhaw', () => ReduxApp);
