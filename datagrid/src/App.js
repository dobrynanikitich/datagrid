import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UsersTable from './components/Table/table';
import { CHANGE_USERS } from './actions/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = ({ isSorted, users, changeUsers }) => {
  useEffect(() => {
    changeUsers();
  }, [])

  return (
    <div className="App">
      <div onClick={changeUsers}>HELLO WORLD!</div>
      <UsersTable usersInfo={users} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isSorted: state.isSorted,
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUsers: () => dispatch({ type: CHANGE_USERS })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
