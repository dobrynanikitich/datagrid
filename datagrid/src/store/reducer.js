import Faker from 'faker';

import { CHANGE_USERS } from '../actions/actions';

const initialState = {
    users: [],
    isSorted: false,
}

const reducer = (state = initialState, action) => {
    let users = [];
    switch (action.type) {
        case CHANGE_USERS: 
            for(let i = 0; i < 100; i++) {
                users.push({
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
                users
            }
        default: return state;
    }
};

export default reducer;