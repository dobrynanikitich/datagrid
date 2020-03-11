import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import './input.css';

let classNames = require('classnames');

const Input = ({ id, filterUsersByColumn, searchInputs, clearInputValueOnUnFocus }) => {
    let classes = classNames({
        'firstNameInput': id === 0,
        'lastNameInput': id === 1,
        'cityInput': id === 2,
        'mainSearchInput': id === 4,
    })
    return (
        <InputGroup size="sm" key={id} className={classes} >
            <FormControl
                key={id}
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchInputs[id]}
                onChange={(e) => {
                    filterUsersByColumn(e, id)
                }}
                // onFocus={clearInputValueOnUnFocus}
            />
        </InputGroup>
    );
};

export default Input;