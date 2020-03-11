import React from 'react';
import { connect } from 'react-redux';

import Input from '../Table/Grid/Input/input';

import { FILTER_BY_COLUMN } from '../../actions/actions';

import './controll.css';

const Controll = ({ searchInputs, filterUsersByColumn }) => {
    return (
        <section className='controll-wrapper'>
            <Input id={100} searchInputs={searchInputs} filterUsersByColumn={filterUsersByColumn}/>
        </section>
    );
};

const mapStateToProps = state => {
    return {
      searchInputs: state.searchInputs,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      filterUsersByColumn: (e, id) => dispatch({ type: FILTER_BY_COLUMN, payload: {e, id}}),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Controll);