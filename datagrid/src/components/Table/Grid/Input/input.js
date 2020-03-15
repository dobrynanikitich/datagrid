import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import './input.css';

let classNames = require('classnames');

const Input = ({ id, filterUsersByColumn, filterUsersByArray, searchInputs }) => {
    let classes = classNames({
        'firstNameInput': id === 0,
        'lastNameInput': id === 1,
        'cityInput': id === 2,
        'mainSearchInput': id === 100,
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
                    e.persist()
                    id === 0 ? filterUsersByColumn(e, id) : filterUsersByArray(e, id)
                }}
            />
        </InputGroup>
    );
};

export default Input;