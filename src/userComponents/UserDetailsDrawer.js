import DetailsSlider from "../components/DetailsSlider";
import {getUserBasicDetails, getUserById} from "../utils/UsersUtil";
import React from "react";
import {useHistory} from "react-router-dom";

function UserDetailsDrawer() {

    const history = useHistory();

    return <DetailsSlider
        dataProviderById={getUserById}
        dataFormatterFunc={getUserBasicDetails}
        queryParameter={'userId'}
        onClose={() => history.push("/users")}
    />
}

export default UserDetailsDrawer;