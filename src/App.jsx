import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import store from './redux/store';
import {ToastContainer} from "react-toastify";
import VehiclePage from "./components/vechile/VehiclePage.jsx";
import NotFoundPage from "./components/common/NotFoundPage.jsx";

const AppContent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<VehiclePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={true}
                        style={{zIndex: 9999999}}
                    />
                    <AppContent/>
                </div>
            </PersistGate>
        </Provider>
    )
}

export default App;
