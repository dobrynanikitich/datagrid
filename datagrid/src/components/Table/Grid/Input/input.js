import React from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const Input = ({ id, filterUsersByColumn, searchInputs }) => {
    return (
        <input key={id} placeholder="Search" value={searchInputs[id]} onChange={(e) => {
            filterUsersByColumn(e, id)
        }}/>
        // <InputGroup size="sm" className="mb-1" key={id}>
        //     <FormControl
        //         key={id}
        //         placeholder="Search"
        //         aria-label="Recipient's username"
        //         aria-describedby="basic-addon2"
        //         value={searchInputs[id]}
        //         onChange={(e) => {
        //             filterUsersByColumn(e, id)
        //         }}
        //     />
        // </InputGroup>
    );
};

export default Input;