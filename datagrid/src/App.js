import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { CHANGE_USERS } from './actions/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AutoSizer from 'react-virtualized-auto-sizer';
import VirtualizedTable from './components/Table/Grid/grid';
import Controll from './components/Controll/controll';

const App = ({  users, changeUsers }) => {

  useEffect(() => {
    changeUsers();
  }, [])

  if (users.length) {
    return (
      <div className="App">
          <Controll />
          <AutoSizer>
            {({ height, width }) => (
              <VirtualizedTable 
                height={height}
              />
            )}
          </AutoSizer>
      </div>
    );
  } else {
    return (
      <div className='spinner'>HELLO</div>
    )
  }

}

const mapStateToProps = state => {
  return {
    isSorted: state.isSorted,
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUsers: () => dispatch({ type: CHANGE_USERS }),
    sortUsers: () => dispatch({ type: 'SORT_USERS' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
