import React from "react";

export const FormWrapper: React.FC = ({ children }) => {
    return (
        <div className="w-2/3 lg:w-1/3 md:w-1/2 sm:w-1/2 pt-5 pb-2 px-10 shadow-md rounded">
            {children}
        </div>
    );
};
