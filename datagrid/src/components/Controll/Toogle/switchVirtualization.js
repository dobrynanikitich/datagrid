import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import './toggle.css';

const SwitchOffVirt = ({ isVitrualized, switchVirtualizationStatus }) => {
    return (
        <label className='toogle-wrapper'>
        <Toggle
            defaultChecked={isVitrualized}
            icons={false}
            onChange={switchVirtualizationStatus} />
        <span>Swich off virtualization</span>
        </label>
    )
};

export default  SwitchOffVirt;