import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

const ToggleButton = ({ isToogleActive, switchToogleHandler }) => {
    return (
        <label>
        <Toggle
            defaultChecked={isToogleActive}
            icons={false}
            onChange={switchToogleHandler} />
        <span>Show active users only</span>
        </label>
    )
};

export default  ToggleButton;