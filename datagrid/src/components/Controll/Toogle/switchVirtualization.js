import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import './toggle.css';

const SwitchOffVirt = ({ isVitrualized, switchVirtualizationStatus, toolTip }) => {
    return (
        <label className='toogle-wrapper' data-tip={toolTip}>
        <Toggle
            defaultChecked={isVitrualized}
            icons={false}
            onChange={switchVirtualizationStatus}
            />
        <span>Swich off virtualization</span>
        </label>
    )
};

export default  SwitchOffVirt;