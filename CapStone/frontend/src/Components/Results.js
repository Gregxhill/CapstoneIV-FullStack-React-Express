import React from "react";
import { Link } from "react-router-dom";

export default function Results({ isLoading, userInfo, gitBucket }) {
  // This component renders the results of the search

  return (
    // if the loading state is false it indicates that the data has been retrieved and it is then formatted and returned.
    <>
      {!isLoading ? (
        <>
          <div className="github">
            <h1>GitHub:</h1>
            {/* This Link component routes the user to another page which renders the User component with the corresponding user data */}
            <Link to={{ pathname: "/user", state: { userInfo: userInfo } }}>
              <h2>{userInfo[0].login}</h2>{" "}
            </Link>
            <img src={userInfo[0].avatar_url} alt="github avatar" />{" "}
          </div>
          <div className="gitlab">
            <h1>GitLab:</h1>
            {/* If the GitBucket data is empty it indicates that the user doesnt have a GitBucket account. If it isnt empty the corresponding data is rendered. */}
            {gitBucket.length !== 0 ? (
              <h2>{userInfo[1][0].name}</h2>
            ) : (
              <p>User not on GitLab</p>
            )}
            {gitBucket.length !== 0 ? (
              <img src={userInfo[1][0].avatar_url} alt="avatar_gitbucket" />
            ) : null}
          </div>
        </>
      ) : null}
      {/* If the data has been retrieved and it has an error message property, it indicates that the user doesnt exist and the error message is rendered */}
      {userInfo.message && !isLoading ? <h1>{userInfo[0].message}</h1> : null}
    </>
  );
}
