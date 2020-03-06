import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import UsersTable from './components/Table/table';
import { CHANGE_USERS } from './actions/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { userDataEnum, firstColumnEnum, tableHeaderEnum, firstColumnHeaderEnum } from './constants/constants';

let classNames = require('classnames');

const App = ({ isSorted, users, changeUsers }) => {
  useEffect(() => {
    changeUsers();
  }, [])

  const staticGrid = React.useRef(null);
  const staticGrid2 = React.useRef(null);
  const onScroll = React.useCallback(
    ({ scrollTop, scrollLeft, scrollUpdateWasRequested }) => {
      if (!scrollUpdateWasRequested && !scrollLeft) {
        staticGrid.current.scrollTo({ scrollLeft: 0, scrollTop });
      } else if (!scrollUpdateWasRequested && scrollLeft) {
        staticGrid2.current.scrollTo({ scrollLeft, scrollTop: 0 });
      }
    }
  );

  const columnWidths = new Array(8)
  .fill(true)
  .map((item, index) => {
    switch (index) {
      case 0: return 150;
      case 1: return 150;
      case 2: return 150;
      case 3: return 220;
      case 4: return 90;
      case 5: return 90;
      case 6: return 90;
      case 7: return 200;
      default: return 150;
    }
  });

  const rowHeights = new Array(1000)
    .fill(true)
    .map(() => 50);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    let classes = classNames({
      'table-cell': true,
      'light-cell': rowIndex % 2 === 0,
      'dark-cell': rowIndex % 2 !== 0,
    })
    return (
      <div className={classes} style={style}>{users[rowIndex][userDataEnum[columnIndex]]}</div>
    );
  };

  const Cell2 = ({ columnIndex, rowIndex, style }) => {
    let classes = classNames({
      'table-cell': true,
      'light-cell': rowIndex % 2 === 0,
      'dark-cell': rowIndex % 2 !== 0,
    })
      return (
        <div className={classes} style={style}>{users[rowIndex][firstColumnEnum[columnIndex]]}</div>
      );
  };

  const Cell3 = ({ columnIndex, rowIndex, style }) => {
    let classes = classNames({
      'table-cell': true,
      'header-cell': rowIndex === 0,
      'light-cell': rowIndex % 2 === 0,
      'dark-cell': rowIndex % 2 !== 0,
    })
      return (
        <div className={classes} style={style}>{tableHeaderEnum[columnIndex + 1]}</div>
      );
  };

  const Cell4 = ({ columnIndex, rowIndex, style }) => {
    let classes = classNames({
      'table-cell': true,
      'header-cell': rowIndex === 0,
      'light-cell': rowIndex % 2 === 0,
      'dark-cell': rowIndex % 2 !== 0,
    })
      return (
        <div className={classes} style={style}>{firstColumnHeaderEnum[0]}</div>
      );
  };

  if (users.length) {
    return (
      <div className="App">
          <AutoSizer>
            {({ height, width }) => (
              <>
              <div className='table-header'>
                <Grid
                  className='table-header-first'
                  ref={staticGrid}
                  columnCount={1}
                  columnWidth={index => columnWidths[7]}
                  height={50}
                  rowCount={1}
                  rowHeight={index => rowHeights[7]}
                  width={200}
                >
                  {Cell4}
                </Grid>
                <Grid
                  className='table-header--second'
                  ref={staticGrid2}
                  columnCount={6}
                  columnWidth={index => columnWidths[index]}
                  height={50}
                  rowCount={1}
                  rowHeight={index => rowHeights[index]}
                  width={685}
                >
                  {Cell3}
                </Grid>
              </div>
              <div className='grid-wrapper'>
                <Grid
                  className='grid-first'
                  ref={staticGrid}
                  columnCount={6}
                  columnWidth={index => columnWidths[7]}
                  height={900}
                  rowCount={100}
                  rowHeight={index => rowHeights[index]}
                  width={200}
                >
                  {Cell2}
                </Grid>
                <Grid
                  onScroll={onScroll}
                  className='grid-second'
                  columnCount={6}
                  columnWidth={index => columnWidths[index]}
                  height={900}
                  rowCount={100}
                  rowHeight={index => rowHeights[index]}
                  width={700}
                >
                  {Cell}
                </Grid>
              </div>
              </>
            )}
          </AutoSizer>
        {/* <UsersTable usersInfo={users} /> */}
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
    changeUsers: () => dispatch({ type: CHANGE_USERS })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
