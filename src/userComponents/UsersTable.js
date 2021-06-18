import FilterableTable from "../components/FilterableTable";
import {getFormattedUser, getUsersCount, getUsersData, usersSchema} from "../utils/UsersUtil";
import React from "react";
import {useHistory} from "react-router-dom";

function UsersTable() {

    const history = useHistory();

    const redirectToUserDetails = (userId) => {
        history.push(`/users/${userId}`);
    };

    return <FilterableTable
        schema={usersSchema}
        dataProviderFunc={getUsersData}
        dataFormatterFunc={getFormattedUser}
        totalCountOfData={getUsersCount()}
        rowsPerPage={8}
        hoverOverRows={true}
        onClick={redirectToUserDetails}
        title={"All Users"}
    />
}

export default UsersTable;