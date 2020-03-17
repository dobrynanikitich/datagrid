import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';

import { selectColumnsEnum } from '../../../constants/constants';

const options = Object.keys(selectColumnsEnum).map(key => (
    {
      value: Number(key - 1),
      label: selectColumnsEnum[key],
      isFixed: Number(key) === 0 || Number(key) === 6  ? true : false,
    }
))

const orderOptions = values => {
    return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
};

const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
  };

const SelectColumns = ({ selectColumnsHandler }) => {
    const [sortOrder, changeSortOrder] = useState(orderOptions([options[0], options[1], options[2], options[3], options[4], options[5], options[6]]))

    useEffect(() => {
        selectColumnsHandler(sortOrder.map(item => item.value).filter(item => item !== -1))
    })

    const onChange = (value, { action, removedValue }) => {
        switch (action) {
          case 'remove-value':
          case 'pop-value':
            if (removedValue.isFixed) {
              return;
            }
            break;
          case 'clear':
            value = options.filter(v => v.isFixed);
            break;
        default: break;
        }
    
        value = orderOptions(value);
        changeSortOrder(value);
    }

    return (
        <Select
            closeMenuOnSelect={false}
            styles={styles} 
            value={sortOrder}
            onChange={onChange} 
            isMulti
            options={options}
            isClearable={sortOrder.some(item => !item.isFidex)}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
}

export default SelectColumns;