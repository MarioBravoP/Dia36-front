import { createContext, useState, useContext } from "react";

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
    const [view, setView] = useState("list");

    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useViewContext = () => useContext(ViewContext);
