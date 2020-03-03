import React from 'react';
import Table from 'react-bootstrap/Table';

import './table.css';

const UsersTable = ({ usersInfo }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Age</th>
                    <th>Username</th>
                    <th>Amount</th>
                    <th>Active Status</th>
                </tr>
            </thead>
            <tbody>
                {usersInfo.map((user, i) => (
                    <tr>
                        <td>{i + 1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.city}</td>
                        <td>{user.age}</td>
                        <td>{user.userName}</td>
                        <td>{user.amount}</td>
                        <td>{user.boolean ? 'true' : 'false'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default UsersTable;