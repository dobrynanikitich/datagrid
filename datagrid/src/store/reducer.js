import Faker from 'faker';

import { CHANGE_USERS, SORT_USERS } from '../actions/actions';
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
    ]
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
              boolean: String(Faker.random.boolean()),
            })
          }
          return {
            ...state,
            users: newUsers
          }
        case SORT_USERS:
          const { payload } = action;
          const { sortedColumns } = state;
          let users = [...state.users];
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
            users: newArr,
            sortedColumns: sortDirection,
          }
        default: return state;
    }
};

export default reducer;