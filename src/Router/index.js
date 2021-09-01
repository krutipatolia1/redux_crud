import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddUser from "../Component/addUser";
import EditUser from "../Component/editUser";
import UserList from "../Pages/userList";

const Routing = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/add-user">
                        <AddUser />
                    </Route>
                    <Route path="/edit-user">
                        <editUser />
                    </Route>
                    <Route path="/">
                        <UserList />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Routing;