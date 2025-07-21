import React from "react";

export const Container = ({children}:{children:React.ReactNode}) => {
    return(
        <div className="max-w-[800] mx-auto bg-[#2e2e2e] text-white">
            {children} 
        </div>
    )
    
}