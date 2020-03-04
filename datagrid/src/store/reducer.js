import Faker from 'faker';

import { CHANGE_USERS } from '../actions/actions';

const initialState = {
    users: [],
    isSorted: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USERS: 
            const users = [];
            for(let i = 0; i < 1000; i++) {
                users.push({
                    firstName: Faker.name.firstName(),
                    lastName: Faker.name.lastName(),
                    city: Faker.address.city(),
                    age: Faker.random.number({ min: 17, max: 80 }),
                    userName: Faker.internet.userName(),
                    amount: Faker.finance.amount(),
                    boolean: Faker.random.boolean(),
                    enum: [
                        { value: 0, label: 'First Name' },
                        { value: 1, label: 'Second Name' },
                        { value: 2, label: 'City' },
                        { value: 3, label: 'Age' },
                        { value: 4, label: 'Username' },
                        { value: 5, label: 'Amount' },
                        { value: 6, label: 'Boolean' }
                    ]
                })
            }
            return {
                ...state,
                users
            }
        default: return state;
    }
};

export default reducer;