import React from "react";
import '@fontsource/roboto';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import UserDetailsDrawer from "./userComponents/UserDetailsDrawer";
import UsersTable from "./userComponents/UsersTable";
import {MainTheme} from "./Theme";

function App() {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "95%",
            margin: "0 auto",
            marginTop: 10,
        }
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={MainTheme}>
            <div className={classes.root}>
                <Router>
                    <Switch>
                        <Route path="/users/:userId">
                            <UserDetailsDrawer/>
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path="/users">
                            <UsersTable/>
                        </Route>
                        <Route path='/'>
                            <Redirect
                                to={{
                                    pathname: "/users",
                                }}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;