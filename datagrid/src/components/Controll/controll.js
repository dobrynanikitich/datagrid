import React from 'react';
import { connect } from 'react-redux';

import Input from '../Table/Grid/Input/input';
import Toogle from './Toogle/toggle';
import SelectAge from './Select/select';
import SelectColumns from './HideColumns/hideColumns';
import SwitchVirtualization from './Toogle/switchVirtualization';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo} from '@fortawesome/free-solid-svg-icons';

import { FILTER_BY_COLUMN, SWITCH_TOOGLE, MULTISELECT_FILTER, FILTER_BY_ARRAY, SELECT_COLUMNS, SWITCH_OFF_VITRUALIZATION } from '../../actions/actions';

import './controll.css';

const Controll = ({ 
    searchInputs, 
    filterUsersByColumn,
    filterUsersByArray, 
    isToogleActive, 
    switchToogleHandler, 
    multiselectFilterHandler,
    selectColumnsHandler,
    switchVirtualizationStatus,
    isVirtualized,
}) => {
    return (
        <section className='controll-wrapper'>
          <div className='left-controll--wrapper'>
            <Input
                id={100} 
                searchInputs={searchInputs}
                filterUsersByColumn={filterUsersByColumn}
                filterUsersByArray={filterUsersByArray}
                toolTip='Filer by any text column in table'
            />
            <Toogle 
                isToogleActive={isToogleActive}
                switchToogleHandler={switchToogleHandler}
                toolTip='Filter only active users in table'
            />
            <SwitchVirtualization 
              isVitrualized={isVirtualized}
              switchVirtualizationStatus={switchVirtualizationStatus}
              toolTip='Try to switch off the virtualize effect and check the sort speed of any column e.x.'
            />
          </div>
          <div className='right-controll--wrapper'>
            <SelectAge multiselectFilterHandler={multiselectFilterHandler} toolTip='Select users by Age column (ENUM implementation)'/>
            <SelectColumns selectColumnsHandler={selectColumnsHandler}/>
            <div className='get-info--wrapper'>
              <div 
                className='get-info' 
                data-multiline={true}
                data-tip='To sort on few columns, please, hold SHIFT btn. To select more then one row to delete, please use CTRL button'
              >
                <span>Get info about hot keys</span>
                <FontAwesomeIcon icon={faInfo} />
              </div>
            </div>
          </div>
        </section>
    );
};

const mapStateToProps = state => {
    return {
      searchInputs: state.searchInputs,
      isToogleActive: state.isToogleActive,
      isVirtualized: state.isVirtualized,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      filterUsersByColumn: (e, id) => dispatch({ type: FILTER_BY_COLUMN, payload: {e, id}}),
      filterUsersByArray: (e, id) => dispatch({ type: FILTER_BY_ARRAY, payload: {e, id}}),
      switchToogleHandler: () => dispatch({ type: SWITCH_TOOGLE }),
      multiselectFilterHandler: (change) => dispatch({ type: MULTISELECT_FILTER, payload: change }),
      selectColumnsHandler: (changedArray) => dispatch({ type: SELECT_COLUMNS, payload: changedArray }),
      switchVirtualizationStatus: () => dispatch({ type: SWITCH_OFF_VITRUALIZATION }),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Controll);