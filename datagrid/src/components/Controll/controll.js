import React from 'react';
import { connect } from 'react-redux';

import Input from '../Table/Grid/Input/input';
import Toogle from './Toogle/toggle';

import { FILTER_BY_COLUMN, SWITCH_TOOGLE } from '../../actions/actions';

import './controll.css';

const Controll = ({ searchInputs, filterUsersByColumn, isToogleActive, switchToogleHandler }) => {
    return (
        <section className='controll-wrapper'>
            <Input id={100} searchInputs={searchInputs} filterUsersByColumn={filterUsersByColumn}/>
            <Toogle 
                isToogleActive={isToogleActive}
                switchToogleHandler={switchToogleHandler}
            />
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
      switchToogleHandler: () => dispatch({ type: SWITCH_TOOGLE })
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Controll);