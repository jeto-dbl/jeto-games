import React from 'react';
import { 
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import './App.scss';

import DisplayDevelopment from "./components/displaydev";
import Home from './components/home';
import SnakeXenzia from './components/snakexenzia';
import PageNotFound from "./components/pagenotfound";
import ScrollButton from "./components/scrollbutton";


function App() {
  const [isLoading, setLoading] = React.useState(true)
  React.useEffect(() => setLoading(false), []);

  // 1. Display loading page till the App component is mounted
  // 2. if isLogo is true then it would use brand designed logo
  //    as the loading icon else would use general icon
  if (isLoading) return (<DisplayDevelopment isLogo={true} />)
  else
    return (
      
        <HashRouter basename="/">
            <div className="app">
              <Switch>
                {/* <RouteList /> */}
                <Route exact path="/">
                  <Home pageTitle="Welcome to JetO Game Village" />
                </Route>
                <Route exact path="/home">
                  <Home pageTitle="Welcome to JetO Game Village" />
                </Route>
                <Route exact path="/jeto-games">
                  <Home pageTitle="Welcome to JetO Game Village" />
                </Route>
                <Route exact path="/snake-xenzia">
                    <SnakeXenzia pageTitle="Snake Xenzia | JetO"/>
                </Route>
                <Route key="page-not-found">
                  <PageNotFound pageTitle="Page not found | JetO" />
                </Route>
              </Switch>
              <ScrollButton />
            </div>
        </HashRouter>
    );
}

export default App;
