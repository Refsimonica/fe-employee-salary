import React from 'react'
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import store from './store/store';
import {listen} from './store/listen';
import Main from '../src/components/Main';

const App = () => {

    React.useEffect(() => {
        listen();
    }, []);

    return (
        <Provider store={store}>
            <Main></Main>
        </Provider>
    )
}

export default App