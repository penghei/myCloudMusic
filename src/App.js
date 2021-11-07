import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import MainHomePage from "./pages/HomePage/MainHomePage";
import ErrorEdge from "./errorEdge/ErrorEdge";

function App() {
  return (
    <div className="App">
      <ErrorEdge>
        <Router>
          <Route path="/main" component={MainHomePage}></Route>
          <Redirect to="/main/recommand"></Redirect>
        </Router>
      </ErrorEdge>
    </div>
  );
}

export default App;
