import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { SORT_USERS } from '../../../actions/actions';
import { VariableSizeGrid as Grid } from 'react-window';
import { userDataEnum, firstColumnEnum, tableHeaderEnum, firstColumnHeaderEnum } from '../../../constants/constants';

import './grid.css';
let classNames = require('classnames');

const VirtualizedTable = ({ users, sortUsers, height }) => {
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
  
    const mainTable = ({ columnIndex, rowIndex, style }) => {
        let classes = classNames({
            'table-cell': true,
            'light-cell': rowIndex % 2 === 0,
            'dark-cell': rowIndex % 2 !== 0,
        })
        return (
            <div className={classes} style={style}>{users[rowIndex][userDataEnum[columnIndex]]}</div>
        );
    };
  
    const stickyLeftColumn = ({ columnIndex, rowIndex, style }) => {
        let classes = classNames({
            'table-cell': true,
            'light-cell': rowIndex % 2 === 0,
            'dark-cell': rowIndex % 2 !== 0,
        });
        return (
            <div className={classes} style={style}>{users[rowIndex][firstColumnEnum[columnIndex]]}</div>
        );
    };
  
    const stickyMainHeader = ({ columnIndex, rowIndex, style }) => {
        let classes = classNames({
            'table-cell': true,
            'header-cell': rowIndex === 0,
            'light-cell': rowIndex % 2 === 0,
            'dark-cell': rowIndex % 2 !== 0,
        });
        return (
            <div 
                id={columnIndex + 1} 
                className={classes} 
                style={style}
                onClick={() => sortUsers(columnIndex + 1)}
                >
                    {tableHeaderEnum[columnIndex]}
                </div>
        );
    };
  
    const stickyLeftHeader = ({ columnIndex, rowIndex, style }) => {
        let classes = classNames({
            'table-cell': true,
            'header-cell': rowIndex === 0,
        })
        return (
            <div
                id={columnIndex}
                className={classes} 
                style={style}
                onClick={() => sortUsers(columnIndex)}
            >
                {firstColumnHeaderEnum[0]}
            </div>
        );
    };

    return (
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
            {stickyLeftHeader}
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
            {stickyMainHeader}
          </Grid>
        </div>
        <div className='grid-wrapper'>
          <Grid
            className='grid-first'
            ref={staticGrid}
            columnCount={6}
            columnWidth={index => columnWidths[7]}
            height={height - 20}
            rowCount={100}
            rowHeight={index => rowHeights[index]}
            width={200}
          >
            {stickyLeftColumn}
          </Grid>
          <Grid
            onScroll={onScroll}
            className='grid-second'
            columnCount={6}
            columnWidth={index => columnWidths[index]}
            height={height}
            rowCount={100}
            rowHeight={index => rowHeights[index]}
            width={700}
          >
            {mainTable}
          </Grid>
        </div>
        </>    
    );
};

const mapStateToProps = state => {
    return {
      users: state.users,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      sortUsers: (id) => dispatch({ type: SORT_USERS, payload: id }),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(VirtualizedTable);


