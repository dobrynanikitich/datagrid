import React from 'react';
import { connect } from 'react-redux';

import Input from '../Table/Grid/Input/input';
import Toogle from './Toogle/toggle';
import SelectAge from './Select/select';
import SelectColumns from './HideColumns/hideColumns';

import { FILTER_BY_COLUMN, SWITCH_TOOGLE, MULTISELECT_FILTER, FILTER_BY_ARRAY, SELECT_COLUMNS } from '../../actions/actions';

import './controll.css';

const Controll = ({ 
    searchInputs, 
    filterUsersByColumn,
    filterUsersByArray, 
    isToogleActive, 
    switchToogleHandler, 
    multiselectFilterHandler,
    selectColumnsHandler,
}) => {
    return (
        <section className='controll-wrapper'>
            <Input 
                id={100} 
                searchInputs={searchInputs} 
                filterUsersByColumn={filterUsersByColumn}
                filterUsersByArray={filterUsersByArray}
            />
            <Toogle 
                isToogleActive={isToogleActive}
                switchToogleHandler={switchToogleHandler}
            />
            <SelectAge multiselectFilterHandler={multiselectFilterHandler}/>
            <SelectColumns selectColumnsHandler={selectColumnsHandler}/>
        </section>
    );
};

const mapStateToProps = state => {
    return {
      searchInputs: state.searchInputs,
      isToogleActive: state.isToogleActive,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      filterUsersByColumn: (e, id) => dispatch({ type: FILTER_BY_COLUMN, payload: {e, id}}),
      filterUsersByArray: (e, id) => dispatch({ type: FILTER_BY_ARRAY, payload: {e, id}}),
      switchToogleHandler: () => dispatch({ type: SWITCH_TOOGLE }),
      multiselectFilterHandler: (change) => dispatch({ type: MULTISELECT_FILTER, payload: change }),
      selectColumnsHandler: (changedArray) => dispatch({ type: SELECT_COLUMNS, payload: changedArray })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Controll);