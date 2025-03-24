import React from 'react';
import ReactDOM from "react-dom";
import App from './app';
import { ViewProvider } from './context/ViewContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
    <AuthProvider>
        <ViewProvider>
            <App />
        </ViewProvider>
    </AuthProvider>,
    document.getElementById("root")
);
