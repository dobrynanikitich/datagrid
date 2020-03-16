import React from 'react';
import Select from 'react-select';

import { ageColumnSortEnum } from '../../../constants/constants';

const options = Object.keys(ageColumnSortEnum).map(key => (
    {
        value: key,
        label: ageColumnSortEnum[key],
        isFixed: Number(key) === 0 ? true : false,
    }
))

const SelectAge = ({ multiselectFilterHandler, toolTip }) => {
    return (
        <Select
            closeMenuOnSelect={false}
            defaultValue={[options[0], options[1], options[2], options[3], options[4]]}
            onChange={(change) => multiselectFilterHandler(change)} 
            isMulti
            options={options}
            data-tip={toolTip}
        />
    );
}

export default SelectAge;