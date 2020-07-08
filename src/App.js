import React, { useState, useEffect } from 'react'
import { 
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";


import './App.scss';
// eslint-disable-next-line
import { RouteList } from "./Routes";
import DisplayDevelopment from "./components/displaydev";

import Home from './components/home';
import SnakeXenzia from './components/snakexenzia'
import PageNotFound from "./components/pagenotfound"


function App() {
  const [isLoading, setLoading] = useState(true)
  useEffect(() => setLoading(false), []);
  // Display loading page till the App component is mounted
  if (isLoading) return (<DisplayDevelopment isLogo={true} />)
  else
    return (
      
        <HashRouter basename="/">
            <div className="App">
              <Switch>
                {/* <RouteList /> */}
                <Route exact path="/">
                  <Home pageTitle="Welcome to the Game Village | JetO" />
                </Route>
                <Route exact path="/home">
                  <Home pageTitle="Welcome to the Game Village | JetO" />
                </Route>
                <Route exact path="/JetO-Games">
                  <Home pageTitle="Welcome to the Game Village | JetO" />
                </Route>
                <Route exact path="/snake-xenzia">
                    <SnakeXenzia pageTitle="Snake Xenzia | JetO"/>
                </Route>
                <Route key="page-not-found">
                  <PageNotFound pageTitle="Page not found!" />
                </Route>
              </Switch>
            </div>
        </HashRouter>
    );
}

export default App;
