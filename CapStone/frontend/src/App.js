import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Components/Form";
import Results from "./Components/Results";
import User from "./Components/User";
import Repo from "./Components/Repo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";

function App() {
  //state tracks the data returned from the server
  const [userInfo, setUserInfo] = useState([]);
  //the userName state tracks the username entered by the user
  const [userName, setUserName] = useState("");
  //the submit state tracks the status of the form submissions
  const [submit, setSubmit] = useState(false);
  //the isLoading state tracks the state of the api call
  const [isLoading, setIsLoading] = useState(true);
  //gitBucket state is used to track the state of the gitBucket response
  const [gitBucket, setGitbucket] = useState([]);

  //This async function sends a request to the backend and passes the username the user entered as a parameter. It then sets the respective states with the returned data
  const getUserInfo = async (userName) => {
    const url = `users/${userName}`;
    const response = await axios.get(url);

    setUserInfo(response.data);
    setGitbucket(response.data[1]);

    console.log(userInfo);

    setIsLoading(false);
    setSubmit(false);
  };

  //this hook executes every time the submit state changes
  useEffect(() => {
    getUserInfo(userName);
  }, [submit]);

  return (
    <div className="App">
      <Router>
        {/* the Form component and Results component is rendered at the root url */}
        <Route exact={true} path="/">
          <Form
            userName={userName}
            setUserName={setUserName}
            setSubmit={setSubmit}
            setIsLoading={setIsLoading}
          />

          <Results
            isLoading={isLoading}
            userInfo={userInfo}
            gitBucket={gitBucket}
          />
          <br></br>

          {/* The following button reloads the page, clearing any search results. */}
          <Button
            onClick={() => window.location.reload()}
            color="primary"
            variant="contained"
          >
            Reset
          </Button>
        </Route>

        {/* The User component renders at the /user url */}
        <Route exact={true} path="/user" component={User}>
          <User userInfo={userInfo} gitBucket={gitBucket} />
        </Route>

        {/* The Repo component renders at the /repo-details url */}
        <Route exact={true} path="/repo-details" component={Repo}></Route>
      </Router>
    </div>
  );
}

export default App;
