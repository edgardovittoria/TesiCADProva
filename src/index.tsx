import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react'
import { MeshesAndCollisionsProvider } from './components/contexts/meshesAndCollisionsProvider';


ReactDOM.render(
    <Provider store={store}>
        <MeshesAndCollisionsProvider>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </MeshesAndCollisionsProvider>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
