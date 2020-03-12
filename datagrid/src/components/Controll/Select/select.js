import React from 'react';
import Select from 'react-select';

import { ageColumnSortEnum } from '../../../constants/constants';

const options = Object.keys(ageColumnSortEnum).map(key => (
    {
        value: key,
        label: ageColumnSortEnum[key],
        maxValue: Number(ageColumnSortEnum[key].slice(-2)),
        minValue: Number(ageColumnSortEnum[key].slice(0, 2)),
    }
))

const SelectAge = ({ multiselectFilterHandler }) => {
    return (
        <Select
            closeMenuOnSelect={false}
            defaultValue={[options[0], options[1], options[2], options[3], options[4]]}
            onChange={(change) => multiselectFilterHandler(change)}
            isMulti
            options={options}
        />
    );
}

export default SelectAge;