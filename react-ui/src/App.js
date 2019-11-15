import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { Header } from "./Header";
import { Switch, Route } from "react-router";
import Voting from "./components/Voting";
import Statistics from "./components/Statistics";
import Top from "./components/Top";

const jupi = "abcd";
const a = 1;

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container-full-width" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                    <Header />
                    <main style={{ height: "-webkit-fill-available" }}>
                        <Switch>
                            <Route exact path="/" component={Voting} />
                            <Route path="/voting" component={Voting} />
                            <Route path="/statistics" component={Statistics} />
                            <Route path="/top" component={Top} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
