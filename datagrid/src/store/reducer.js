import Faker from 'faker';
import { tableHeaderEnum } from '../constants/constants';

import { 
  CHANGE_USERS, 
  SORT_USERS, 
  FILTER_BY_COLUMN,
  FILTER_BY_ARRAY, 
  SWITCH_TOOGLE, 
  MULTISELECT_FILTER,
  PRESS_KEYS_CONTROLL,
  SET_ACTIVE_ROW,
  DELETE_SELECTED_ROW,
  SELECT_COLUMNS,
  SWITCH_OFF_VITRUALIZATION,
} from '../actions/actions';

import { sortArrayEnum } from '../constants/constants'; 
let _  = require('lodash');

const initialState = {
    users: [
      {
        firstName: 'AaaTestToCheckSort',
        lastName: 'BbbTestToCheckSort',
        city: 'Minsk',
        age: 40,
        userName: 'CccTestToCHeckSort',
        amount: 200000,
        boolean: 'yes',
      },
      {
        firstName: 'AaaTestToCheckSort',
        lastName: 'BbbTestToCheckSort',
        city: 'London',
        age: 30,
        userName: 'BbbTestToCHeckSort',
        amount: 200000,
        boolean: 'yes',
      },
      {
        firstName: 'AaaTestToCheckSort',
        lastName: 'BbbTestToCheckSort',
        city: 'Paris',
        age: 80,
        userName: 'AaaTestToCHeckSort',
        amount: 200000,
        boolean: 'yes',
      },
      {
        firstName: 'AaaTestToCheckSort',
        lastName: 'BbbTestToCheckSort',
        city: 'Monaco',
        age: 20,
        userName: 'ZzzTestToCHeckSort',
        amount: 200000,
        boolean: 'yes',
      },
    ],
    sortedColumns: [
      {
        name: 'firstName',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
      {
        name: 'lastName',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
      {
        name: 'city',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
      {
        name: 'age',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
      {
        name: 'userName',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
      {
        name: 'amount',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
      {
        name: 'boolean',
        isSorted: false,
        sortDir: null,
        sortPriority: null,
      },
    ],
    searchInputs: {
      0: '',
      1: '',
      2: '',
      3: '',
      100: '',
    },
    isToogleActive: false,
    filters: {},
    sort: [],
    clickedRows: [],
    columnsToDisplay: Object.keys(tableHeaderEnum),
    isVirtualized: true,
}

const filtersUsersArrayHandler = (filters, usersArray) => {
  let currentUsers = [...usersArray];
    if (filters.searchByColumn) {
      currentUsers = currentUsers.filter(item => {
          return item[sortArrayEnum[0]].toLowerCase().includes(filters.searchByColumn)
        })
      }

    if (filters.searchByArray) {
      currentUsers = filterByValue(currentUsers, filters.searchByArray);
    }

    if (filters.searchByToogle) {
      if (filters.searchByToogle) {
        currentUsers = currentUsers.filter(item => (
          item[sortArrayEnum[6]] === 'yes'
        ))
      } else {
        return currentUsers;
      }
    }

    if (filters.searchBySelect) {
      currentUsers = currentUsers.filter(item => (
        filters.searchBySelect.some(data => Number(data.value) === item.ageValue)
      ))
    }

    return currentUsers;
}

const compareValuesToAscend = (a, b, property) => {
    if (a[property] > b[property]) {
      return 1;
    } if (a[property] < b[property]) {
      return -1;
    } return 0
  }

  const compareValuesToDescend = (a, b, property) => {
    if (a[property] < b[property]) {
      return 1;
    } if (a[property] > b[property]) {
      return -1;
    } return 0
  }

  const filterByValue = (array, value) => (
    array.filter(object =>
      Object.keys(object).some(prop => {
        if (typeof(object[prop]) === 'string') {
          return object[prop].toLowerCase().includes(value)
        }
        return false;
      }))
  )

const reducer = (state = initialState, action) => {
    let newUsers = [...state.users];
    switch (action.type) {
        case CHANGE_USERS:
          for(let i = 0; i < 997; i++) {
            newUsers.push({
              firstName: Faker.name.firstName(),
              lastName: Faker.name.lastName(),
              city: Faker.address.city(),
              age: Faker.random.number({ min: 17, max: 80 }),
              userName: Faker.internet.userName(),
              amount: Number(Faker.finance.amount()),
              boolean: Faker.random.boolean() ? 'yes' : 'no',
            })
          }
          newUsers.map(item => {
            if (item.age >= 17 && item.age <= 24) {
              item['ageValue'] = 0;
            } else if (item.age >= 25 && item.age <= 31) {
              item['ageValue'] = 1;
            } else if (item.age >= 32 && item.age <= 40) {
              item['ageValue'] = 2;
            } else if (item.age >= 41 && item.age <= 60) {
              item['ageValue'] = 3;
            } else {
              item['ageValue'] = 4;
            }
          })
          return {
            ...state,
            users: newUsers,
            transformUsers: [...newUsers]
          }

        case SORT_USERS: {
          const { payload } = action;
          const { sortedColumns } = state;
          let copyUsers = [...state.users];
          let sortDirection = [...sortedColumns];
          let newArr = [...state.sort];
          const filters = {
            ...state.filters,
            filterBySort: {
              sortDirection,
              payload,
            },
          }

          if (state.isShiftPressed) {
            let prevSortedColumn;

            if(!newArr.length) {
              newArr.push(sortDirection[payload])
            } else {
              if (newArr.length < 2 && newArr[0].name !== sortDirection[payload].name) {
                newArr.push(sortDirection[payload]);
              } else {
                if (newArr.length > 1) {
                  prevSortedColumn = sortDirection.findIndex(item => item.name === newArr[1].name);
                  if (newArr[1].name !== sortDirection[payload].name) {
                    sortDirection[prevSortedColumn].isSorted = false;
                    sortDirection[prevSortedColumn].sortDir = null;
                    sortDirection[prevSortedColumn].sortPriority = null;
                  }
                  newArr.splice(newArr.length - 1, 1, sortDirection[payload]);
                }
              }
            }
            
            copyUsers = _.orderBy(copyUsers, newArr.map(item => item.name), newArr.map(item => {
              if (item.name !== sortArrayEnum[payload]) {
                return item.sortDir === 'ascend' ? 'asc' : 'desc';
              } else {
                return item.sortDir === 'ascend' ? 'desc' : 'asc';
              }
            }));

            sortDirection[payload].isSorted = true;
            sortDirection[payload].sortDir !== 'ascend' || sortDirection[payload].sortDir === 'descend' ? sortDirection[payload].sortDir = 'ascend' : sortDirection[payload].sortDir = 'descend';
            if (newArr.length === 2) {
              let firstIndex = sortDirection.findIndex(item => item.name === newArr[0].name);
              let secondIndex = sortDirection.findIndex(item => item.name === newArr[1].name);
              sortDirection[firstIndex].sortPriority = 'first';
              sortDirection[secondIndex].sortPriority = 'second';
            }
          } else {
            newArr = [];
          if (!sortedColumns[payload].isSorted) {
            sortDirection.map(item => {
              item.sortDir = null;
              item.isSorted = false;
              item.sortPriority = null;
            })
            copyUsers.sort((a, b) => {
              sortDirection[payload].isSorted = true;
              sortDirection[payload].sortDir = 'ascend';
              return compareValuesToAscend(a, b, sortArrayEnum[payload]);
            });
          } else {
            sortDirection.map(item => {
              if(item.name !== sortArrayEnum[payload]) {
                item.isSorted = false;
                item.sortDir = null;
              }
            })
            if (sortedColumns[payload].sortDir === 'ascend') {
              copyUsers.sort((a, b) => {
                sortDirection[payload].sortDir = 'descend';
                return compareValuesToDescend(a, b, sortArrayEnum[payload]);
              });
            } else {
              copyUsers.sort((a, b) => {
                sortDirection[payload].sortDir = 'ascend';
                return compareValuesToAscend(a, b, sortArrayEnum[payload]);
              });
            }
          }
          newArr.push(sortDirection[payload]);
          }

          const transormeUsers = filtersUsersArrayHandler(filters, copyUsers);

          return {
            ...state,
            transformUsers: transormeUsers,
            users: copyUsers,
            sortedColumns: sortDirection,
            sort: newArr,
          }
        }

          case FILTER_BY_ARRAY: {
            const copyUsers = [...state.users];
            const inputValue = action.payload.e.target.value.toLowerCase();
            let filters = {
              ...state.filters,
              searchByArray: inputValue,
            }
            const arrayInputId = action.payload.id;

            const transformByArray = filtersUsersArrayHandler(filters, copyUsers);
            return {
              ...state,
              transformUsers: transformByArray,
              searchInputs: {
                ...state.searchInputs,
                [arrayInputId]: inputValue,
              },
              filters: filters
            }
          }

          case FILTER_BY_COLUMN: {
            const copyUsers = [...state.users];
            const value = action.payload.e.target.value.toLowerCase();
            const inputId = action.payload.id;
            let filters = {
              ...state.filters,
              searchByColumn: value,
            }

            const tranformUsers = filtersUsersArrayHandler(filters, copyUsers);

            return {
              ...state,
              transformUsers: tranformUsers,
              searchInputs: {
                ...state.searchInputs,
                [inputId]: value
              },
              filters: filters
            }
          }


          case SWITCH_TOOGLE: {
            const copyUsers = [...state.users];
            const currentToogleStatus = !state.isToogleActive;
            let filters = {
              ...state.filters,
              searchByToogle: currentToogleStatus,
            }

            const tranformUsers = filtersUsersArrayHandler(filters, copyUsers);

            return {
              ...state,
              transformUsers: tranformUsers,
              isToogleActive: currentToogleStatus,
              filters: filters,
            }
          }
          
          case MULTISELECT_FILTER: {
            const copyUsers = [...state.users];
            const selectedFields = action.payload;
            const filters = {
              ...state.filters,
              searchBySelect: selectedFields, 
            }

            const tranformUsers = filtersUsersArrayHandler(filters, copyUsers);

            return {
              ...state,
              transformUsers: tranformUsers,
              filters: filters,
            }
          }

          case PRESS_KEYS_CONTROLL: {
            let isShiftPressed = false;
            let isCtrlPressed = false;
            const { key, type } = action.payload.e;
            if (key === 'Shift' && type === 'keydown') {
              isShiftPressed = true;
            }
            if (key === 'Shift' && type === 'keyup') {
              isShiftPressed = false;
            }
            if (key === 'Control' && type === 'keydown') {
              isCtrlPressed = true;
            }
            if (key === 'Control' && type === 'keyup') {
              isCtrlPressed = false;
            }

            return {
              ...state,
              isShiftPressed: isShiftPressed,
              isCtrlPressed: isCtrlPressed,
            }
          }

          case SET_ACTIVE_ROW: {
            const { id } = action.payload.e.target;
            const setRows = [...state.clickedRows];
            if (state.isCtrlPressed) {
              const index = setRows.findIndex(item => Number(item) === Number(id));
              if (index === -1) {
                setRows.push(id);
              } else {
                setRows.splice(index, 1); 
              }
            } else {
              const index = setRows.findIndex(item => Number(item) === Number(id));
              if (index === -1) {
                setRows.splice(0, 1, id);
              } else {
                setRows.pop();
              }
            }
            
            return {
              ...state,
              clickedRows: setRows,
            }
          }

          case DELETE_SELECTED_ROW: {
            const selectedRows = [...state.clickedRows];
            const copyUsers = [...state.users];
            selectedRows.map(item => {
              copyUsers.splice(Number(item), 1, 'deleted')
            })
            const filteredUsers = copyUsers.filter(item => item !== 'deleted');

            return {
              ...state,
              users: filteredUsers,
              transformUsers: filteredUsers,
              clickedRows: [],
            }
          }

          case SELECT_COLUMNS: {
            const displayColumns = action.payload.sort();
            return {
              ...state,
              columnsToDisplay: displayColumns,
            }
          }

          case SWITCH_OFF_VITRUALIZATION: {
            return {
              ...state,
              isVirtualized: !state.isVirtualized,
            }
          }
      default: return {
        ...state,
      }
    }
};

export default reducer;