import React from "react";

interface Props{
    children: React.ReactNode;
}

function FormContainer({children}: Props){
    return(
        <div className="bg-white border-2 border-[#2A86FF] rounded-sm space-y-4">
            {children};
        </div>
    );
}

export default FormContainer;