import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { CHANGE_USERS, PRESS_KEYS_CONTROLL, DELETE_SELECTED_ROW } from './actions/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import VirtualizedTable from './components/Table/Grid/grid';
import Controll from './components/Controll/controll';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const App = ({  users, changeUsers, keyPressControllHandler, setRows, deleteSelectedRow }) => {
  useEffect(() => {
    document.addEventListener("keydown", (e) => keyPressControllHandler(e));
    document.addEventListener('keyup', (e) => keyPressControllHandler(e));
    changeUsers();
  }, []);

  if (users.length) {
    return (
      <div className="App">
          <ReactTooltip place='bottom' />
          <Controll />
          <div className={!setRows.length ? 'displayNone' : 'deleteRows'}>
            <div>
              <span className='delete-rows'>delete selected rows</span>
              <span onClick={() => deleteSelectedRow()} className='trashAlt'><FontAwesomeIcon icon={faTrashAlt} /></span>
            </div>
          </div>
          <section className='table-wrapper'>
            <VirtualizedTable />
          </section>
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
    setRows: state.clickedRows,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUsers: () => dispatch({ type: CHANGE_USERS }),
    sortUsers: () => dispatch({ type: 'SORT_USERS' }),
    keyPressControllHandler: (e) => dispatch({ type: PRESS_KEYS_CONTROLL, payload: { e } }),
    deleteSelectedRow: () => dispatch({ type: DELETE_SELECTED_ROW })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
