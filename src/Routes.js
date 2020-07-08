import React from 'react'
import { Route } from 'react-router-dom'

import { 
    SNAKE_NAME, 
    ORG_NAME 
} from './strings'

import Home from './components/home';
import SnakeXenzia from './components/snakexenzia';
// eslint-disable-next-line
import PageNotFound from './components/pagenotfound';

const routes = [
    {
        pageTitle: "Welcome to the Game Village",
        exact: true,
        path: "/",
        component: Home,
    },
    {
        pageTitle: "Welcome to the Game Village",
        exact: true,
        path: "/home",
        component: Home,
    },
    {
        pageTitle: SNAKE_NAME + " | " + ORG_NAME,
        exact: true,
        path: "/snake-xenzia",
        component: SnakeXenzia,
    },
    // {
    //     pageTitle:  "Page not found!",
    //     exact: true,
    //     path: "*",
    //     component: PageNotFound,
    // },

]

const RouteList = () => {
    const routeList = routes.map(({ pageTitle, exact, path, component: Component }, idx) => {
        return (
            <Route key={idx} exact={exact} path={path}>
                <Component pageTitle={pageTitle} />
            </Route>
        )
    })
    // routeList.push(
    //     <Route key="page-not-found">
    //         <PageNotFound pageTitle="Page not found!" />
    //     </Route>
    // )
    return routeList
} 

export {
    RouteList,
}