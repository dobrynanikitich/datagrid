import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { SORT_USERS, FILTER_BY_COLUMN } from '../../../actions/actions';
import { VariableSizeGrid as Grid } from 'react-window';
import { userDataEnum, firstColumnEnum, tableHeaderEnum, firstColumnHeaderEnum, leftHeaderArray } from '../../../constants/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import Input from './Input/input';

import './grid.css';

let classNames = require('classnames');

const VirtualizedTable = ({ users, sortUsers, height, sortedColumns, filterUsersByColumn, searchInputs }) => {
    const staticGrid = React.useRef(null);
    const staticGrid2 = React.useRef(null);
    const staticGrid3 = React.useRef(null);
    const onScroll = React.useCallback(
        ({ scrollTop, scrollLeft, scrollUpdateWasRequested }) => {
            if (!scrollUpdateWasRequested) {
                staticGrid.current.scrollTo({ scrollLeft: 0, scrollTop: 0 });
                staticGrid2.current.scrollTo({ scrollLeft, scrollTop: 0 });
                staticGrid3.current.scrollTo({ scrollLeft: 0, scrollTop });
            }
        }
    );
  
    const columnWidths = new Array(8)
        .fill(true)
        .map((item, index) => {
        switch (index) {
            case 0: return 200;
            case 1: return 200;
            case 2: return 90;
            case 3: return 220;
            case 4: return 90;
            case 5: return 90;
            case 6: return 90;
            case 7: return 200;
            case 8: return 75;
            default: return 150;
        }
    });
  
    const rowHeights = new Array(1000)
        .fill(true)
        .map((item, index) => {
            return 50;
        });
  
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
        });
        return (
            <div className={classes} style={style}>{users[rowIndex][firstColumnEnum[columnIndex]]}</div>
        );
    };
  
    const stickyMainHeader = ({ columnIndex, rowIndex, style }) => {
        let classes = classNames({
            'header-cell': true,
        });
        return (
            <>
            <div 
                id={columnIndex + 1} 
                className={classes} 
                style={style}
                onClick={rowIndex !== 1 ? () => sortUsers(columnIndex + 1) : null}
            >
                {
                    rowIndex !== 1 && 
                    <>
                    {tableHeaderEnum[columnIndex]}             
                        <div className='icons-wrapper'>
                            <FontAwesomeIcon 
                                icon={faLongArrowAltDown}
                                className={sortedColumns[columnIndex + 1].isSorted && sortedColumns[columnIndex + 1].sortDir === 'descend' ?
                                'showSortOder' : 'hideSortOrder' }
                            />
                            <FontAwesomeIcon 
                                className={sortedColumns[columnIndex + 1].isSorted && sortedColumns[columnIndex + 1].sortDir === 'ascend' ?
                                'showSortOder' : 'hideSortOrder'  }
                                icon={faLongArrowAltUp} 
                            />
                        </div>
                    </>
                }
                {rowIndex === 1 && columnIndex < 2 && null}
            </div>
            </>
        );
    };
  
    const stickyLeftHeader = ({ columnIndex, rowIndex, style }) => {
        let classes = classNames({
            'header-cell': true,
        })
        return (
            <>
            <div
                key={`${columnIndex}${rowIndex}20`}
                className={classes} 
                style={style}
                onClick={rowIndex !== 1 ? () => sortUsers(columnIndex) : null }
            >
                {rowIndex === 1 ? <input id={columnIndex} key={columnIndex} filterUsersByColumn={filterUsersByColumn} searchInputs={searchInputs} value={searchInputs[columnIndex]} onChange={(e) => {
            filterUsersByColumn(e, columnIndex)}} /> : 
                <>
                    {'First Name'}
                    <div className='icons-wrapper'>
                        <FontAwesomeIcon
                            icon={faLongArrowAltDown}
                            className={sortedColumns[columnIndex].isSorted && sortedColumns[columnIndex].sortDir === 'descend' ?
                            'showSortOder' : 'hideSortOrder' }
                        />
                        <FontAwesomeIcon 
                            className={sortedColumns[columnIndex].isSorted && sortedColumns[columnIndex].sortDir === 'ascend' ?
                            'showSortOder' : 'hideSortOrder'  }
                            icon={faLongArrowAltUp} 
                        />
                    </div>
                </>
                }
            </div>
            </>
        );
    };

    return (
        <>
        {/* <Input id={0} key={0} /> */}
        <div className='table-header'>
          <Grid
            key={100}
            className='table-header-first'
            ref={staticGrid}
            columnCount={1}
            columnWidth={index => columnWidths[7]}
            height={100}
            rowCount={2}
            rowHeight={index => rowHeights[index]}
            width={200}
          >
            {stickyLeftHeader}
          </Grid>
          <Grid
            className='table-header--second'
            ref={staticGrid2}
            columnCount={6}
            columnWidth={index => columnWidths[index]}
            height={100}
            rowCount={2}
            rowHeight={index => rowHeights[index]}
            width={685}
          >
            {stickyMainHeader}
          </Grid>
        </div>
        <div className='grid-wrapper'>
          <Grid
            className='grid-first'
            ref={staticGrid3}
            columnCount={1}
            columnWidth={index => columnWidths[7]}
            height={height - 20}
            rowCount={users.length}
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
            rowCount={users.length}
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
      users: state.transformUsers,
      sortedColumns: state.sortedColumns,
      searchInputs: state.searchInputs,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      sortUsers: (id) => dispatch({ type: SORT_USERS, payload: id }),
      filterUsersByColumn: (e, id) => dispatch({ type: FILTER_BY_COLUMN, payload: {e, id}})
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(VirtualizedTable);


