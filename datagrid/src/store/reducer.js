import Faker from 'faker';

import { 
  CHANGE_USERS, 
  SORT_USERS, 
  FILTER_BY_COLUMN,
  FILTER_BY_ARRAY,
  CLEAR_INPUT_VALUE, 
  SWITCH_TOOGLE, 
  MULTISELECT_FILTER 
} from '../actions/actions';

import { sortArrayEnum } from '../constants/constants'; 

const initialState = {
    users: [],
    sortedColumns: [
      {
        name: 'firstName',
        isSorted: false,
        sortDir: null,
      },
      {
        name: 'lastName',
        isSorted: false,
        sortDir: null,
      },
      {
        name: 'city',
        isSorted: false,
        sortDir: null,
      },
      {
        name: 'age',
        isSorted: false,
        sortDir: null,
      },
      {
        name: 'userName',
        isSorted: false,
        sortDir: null,
      },
      {
        name: 'amount',
        isSorted: false,
        sortDir: null,
      },
      {
        name: 'boolean',
        isSorted: false,
        sortDir: null,
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
    filters: {

    }
}

const filtersUsersArrayHandler = (filters, usersArray) => {
  let currentUsers = [...usersArray];
    if (filters.searchByColumn) {
      currentUsers = usersArray.filter(item => {
          return item[sortArrayEnum[0]].toLowerCase().includes(filters.searchByColumn)
        })
      }

    if (filters.searchByArray) {
      currentUsers = filterByValue(currentUsers, filters.searchByArray);
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
    let newUsers = [];
    switch (action.type) {
        case CHANGE_USERS: 
          for(let i = 0; i < 100; i++) {
            newUsers.push({
              firstName: Faker.name.firstName(),
              lastName: Faker.name.lastName(),
              city: Faker.address.city(),
              age: Faker.random.number({ min: 17, max: 80 }),
              userName: Faker.internet.userName(),
              amount: Faker.finance.amount(),
              boolean: Faker.random.boolean() ? 'yes' : 'no',
            })
          }
          newUsers.map(item => {
            if (item.age > 18 && item.age <= 24) {
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

        case SORT_USERS:
          const { payload } = action;
          const { sortedColumns } = state;
          let users = [...state.transformUsers];
          let newArr = users;
          let sortDirection = [
            ...sortedColumns,
          ]
          if (!sortedColumns[payload].isSorted) {
            let prevSortObj = sortDirection.find(item => (
              item.isSorted && item.sortDir
            ));
            if (prevSortObj) {
              prevSortObj.isSorted = false;
              prevSortObj.sortDir = null;
            }
            newArr.sort((a, b) => {
              sortDirection[payload].isSorted = true;
              sortDirection[payload].sortDir = 'ascend';
              return compareValuesToAscend(a, b, sortArrayEnum[payload]);
            });
          } else {
            if (sortedColumns[payload].sortDir === 'ascend') {
              newArr.sort((a, b) => {
                sortDirection[payload].sortDir = 'descend';
                return compareValuesToDescend(a, b, sortArrayEnum[payload]);
              });
            } else {
              newArr.sort((a, b) => {
                sortDirection[payload].sortDir = 'ascend';
                return compareValuesToAscend(a, b, sortArrayEnum[payload]);
              });
            }
          }
          return {
            ...state,
            transformUsers: newArr,
            users: newArr,
            sortedColumns: sortDirection,
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


          case SWITCH_TOOGLE:
            let actualUsers = [...state.transformUsers];
            let currentToogleStatus = !state.isToogleActive;
            let toggledUsers = [];
            let bufferUsers = [];
            if (!state.isToogleActive) {
              bufferUsers = state.transformUsers;
            }
            if (currentToogleStatus) {
              toggledUsers = actualUsers.filter(item => (
                item[sortArrayEnum[6]] === 'yes'
              ))
            } else {
              bufferUsers = state.bufferUsers.filter(item => {
                return item[sortArrayEnum[6]] === 'no' || item[sortArrayEnum[6]] === 'yes'
              })
            }
            return {
              ...state,
              transformUsers: currentToogleStatus ? toggledUsers : bufferUsers,
              isToogleActive: currentToogleStatus,
              bufferUsers: bufferUsers,
            }
          
          case MULTISELECT_FILTER:
            const selectedFields = action.payload;
            let selectedUsers = [...state.transformUsers];
            let newselectedUsers = selectedUsers.filter(item => (
              selectedFields.some(data => Number(data.value) === item.ageValue)
            ))
            return {
              ...state,
              transformUsers: newselectedUsers
            }
      default: return state;
    }
};

export default reducer;