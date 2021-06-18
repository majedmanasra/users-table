import axios from "axios";
import moment from 'moment';

const getUserApi = 'https://randomuser.me/api';

export const usersSchema = {
    fields: [
        { field: 'user', title: 'User'},
        { field: 'contactInformation', title: 'Contact Information' },
        { field: 'registrationDate', title: 'Registration Date' },
        { field: 'countryAndPostCode', title: 'Country/Post Code' },
    ],
    filters: [
        {name: "Gender", apiKey: "gender"},
        {name: "Nationality", apiKey: "nat"}
    ]
};

export const getFormattedUser = (user) => {

    return {
        id: user.id.value,
        user: {
            majorTextField: `${user.name.first} ${user.name.last}`,
            minorTextField: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.state} ${user.location.postcode}`,
            thumbnail: user.picture.thumbnail
        },
        contactInformation: {
            majorTextField: user.email,
            minorTextField: user.phone,
        },
        registrationDate: {
            majorTextField: moment(user.registered.date).format("MMM DD, yy"),
            minorTextField: moment(user.registered.date).format("LT")
        },
        countryAndPostCode: {
            majorTextField: user.location.country,
            minorTextField: user.location.city,
        },
        gender: user.gender
    }
};

export const getUserBasicDetails = (user) => {
    user = getFormattedUser(user);

    return {
        avatar: user.user.thumbnail,
        majorTextField: user.user.majorTextField,
        minorTextField: user.user.minorTextField,
    }
};

export const getUsersData = (page, rowsPerPage, filters) => {
    let filterArgs = "";
    filters.map(t => t.searchText && (filterArgs += `&${t.apiKey}=${t.searchText}`));

    return axios.get(`${getUserApi}?results=${rowsPerPage}&page=${page}${filterArgs}`);
};

export const getUserById = (id) => {
    return axios.get(`${getUserApi}?userId=${id}`);
};

export const getUsersCount = () => {
    return 100;
};