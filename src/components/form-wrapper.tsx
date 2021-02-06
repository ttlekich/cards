import React from "react";

export const FormWrapper: React.FC = ({ children }) => {
    return (
        // <div className="lg:w-1/3 md:w-1/2 sm:w-1/2 pt-5 pb-2 px-10 shadow-md rounded">
        <div className="w-64 lg:w-96 md:w-80 sm:w-72 px-10 py-5 shadow-md rounded">
            {children}
        </div>
    );
};
