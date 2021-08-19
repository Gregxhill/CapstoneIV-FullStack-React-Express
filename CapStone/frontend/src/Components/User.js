import React from "react";
import {
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGitlab } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

//This component returns a card containing the users details and GitHub repos
export default function User({ gitBucket }) {
  // The info for the current user is passed via the state object in a Link react-dom component
  const location = useLocation();
  const { userInfo } = location.state;
  const uri = userInfo[0].repos_url;
  const [repoData, setRepoData] = useState([]);
  const [fetched, setFetched] = useState(false);

  //the useEffect hook fetches the users repo data on component mount
  useEffect(() => {
    async function fetchRepos(uri) {
      const response = await axios(uri);
      const data = response.data;
      setRepoData(data);
      setFetched(true);
    }
    fetchRepos(uri);
  }, []);

  return (
    <Container>
      <Card>
        <CardHeader
          avatar={<Avatar src={userInfo[0].avatar_url}></Avatar>}
          title={userInfo[0].login}
          subheader={userInfo[0].name}
        />
        <CardContent>
          <Typography variant="h5">Bio:</Typography>
          <Typography>{userInfo[0].bio}</Typography>
          <br></br>
          <Typography variant="h5">GitHub Repo's</Typography>
          {/* If the users repo data has been fetched, it is returned as material-ui list items */}
          <List>
            {fetched ? (
              repoData.map((repo) => {
                return (
                  <ListItem key={repo.id}>
                    {/* Renders out a link that'll take the user to a page to view that repo's info */}
                    <Link
                      to={{
                        pathname: "/repo-details",
                        state: { repoData: repo },
                      }}
                    >
                      <Button color="primary">
                        <ListItemText primary={repo.name} />
                      </Button>
                    </Link>
                    <ListItemIcon>
                      <ArrowForwardIosIcon />
                    </ListItemIcon>
                  </ListItem>
                );
              })
            ) : (
              <li>Still Loading repo data</li>
            )}
          </List>
        </CardContent>
        {/* A GitHub icon button and/or a GitLab icon button is rendered that'll take the end user to the respective username's page */}
        <CardActions disableSpacing>
          <IconButton
            onClick={() => (window.location.href = userInfo[0].html_url)}
          >
            <FontAwesomeIcon color="primary" icon={faGithub}></FontAwesomeIcon>
          </IconButton>
          {/* If the username has a GitLab acc */}
          {gitBucket.length !== 0 ? (
            <IconButton
              onClick={() => (window.location.href = userInfo[1][0].web_url)}
            >
              <FontAwesomeIcon icon={faGitlab}></FontAwesomeIcon>
            </IconButton>
          ) : null}
        </CardActions>
      </Card>
    </Container>
  );
}
