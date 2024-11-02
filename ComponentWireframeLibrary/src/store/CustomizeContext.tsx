import { createContext, useContext, useState } from 'react';

const CustomizeContext = createContext();

export const CustomizeProvider = ({ children }) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [externalCssContent, setExternalCssContent] = useState<string>('');
    const [tailwindCss, setTailwindCss] = useState<string>('');

    return (
        <CustomizeContext.Provider value={{
            htmlContent, setHtmlContent,
            externalCssContent, setExternalCssContent,
            tailwindCss, setTailwindCss
        }}>
            {children}
        </CustomizeContext.Provider>
    );
};

export const useCustomize = () => useContext(CustomizeContext);
