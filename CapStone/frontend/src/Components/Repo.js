import { Typography } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

//this function takes in a date string and returns a formatted human readable version
function date(d) {
  return new Date(d).toLocaleDateString();
}

//This component renders out the data for the given repo formatted using material-ui components
export default function Repo() {
  //the data for the selected repo is sent as state data via the react-router Link component and accessed via useLocation().
  const location = useLocation();
  const { repoData } = location.state;
  return (
    <>
      <Card>
        <CardHeader title={repoData.name} subheader={repoData.description} />
        <CardContent>
          <Typography variant="h4">Description:</Typography>
          <Typography>
            {/* If there is no description "blank" is rendered */}
            {repoData.description !== null ? repoData.description : "blank"}
          </Typography>
          <br />
          <Typography variant="h4">Created:</Typography>
          <Typography>{date(repoData.created_at)}</Typography>
          <br />
          <Typography variant="h4">Last Commit:</Typography>
          <Typography>{date(repoData.updated_at)}</Typography>
          <br />
          {/* The button redirects the user to the GitHub page of the current repo */}
          <Button
            color="primary"
            onClick={() => (window.location.href = repoData.html_url)}
            variant="contained"
          >
            View
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
