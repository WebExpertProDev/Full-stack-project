import React from "react";


const VerticalLine = ({color}) => {
    return <div className="line">
        <style jsx>{`
        .line {
        border-left: 1px solid ${color};
        }
        `}</style>
    </div>;
};

export default VerticalLine
