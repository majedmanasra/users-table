import {createMuiTheme} from "@material-ui/core/styles";

const MainTheme = createMuiTheme({
    primaryText: {
        color: "#252733",
        size: 14
    },
    secondaryText: {
        color: "#C5C7CD",
        size: 12
    },
    table: {
        header: {
            fontWeight: 'bold',
            fontSize: 14,
            color: "#9FA2B4"
        }
    }
});


export {MainTheme};