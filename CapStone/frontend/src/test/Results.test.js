import React from "react";
import Results from "../Components/Results";
import renderer from "react-test-renderer";

//this is a snapshot test when the component isn't sent data
test("renders correctly with no data", () => {
  const tree = renderer
    .create(<Results isLoading={true} userInfo={[]} gitBucket={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

//this is a snapshot test when the component is sent the user data
test("renders correctly with data", () => {
  const tree = renderer
    .create(
      <Results
        isLoading={false}
        userInfo={[
          {
            login: "Gregxhill",
            id: 78414802,
            node_id: "MDQ6VXNlcjc4NDE0ODAy",
            avatar_url: "https://avatars.githubusercontent.com/u/78414802?v=4",
            gravatar_id: "",
            url: "https://api.github.com/users/Gregxhill",
            html_url: "https://github.com/Gregxhill",
            followers_url: "https://api.github.com/users/Gregxhill/followers",
            following_url:
              "https://api.github.com/users/Gregxhill/following{/other_user}",
            gists_url: "https://api.github.com/users/Gregxhill/gists{/gist_id}",
            starred_url:
              "https://api.github.com/users/Gregxhill/starred{/owner}{/repo}",
            subscriptions_url:
              "https://api.github.com/users/Gregxhill/subscriptions",
            organizations_url: "https://api.github.com/users/Gregxhill/orgs",
            repos_url: "https://api.github.com/users/Gregxhill/repos",
            events_url:
              "https://api.github.com/users/Gregxhill/events{/privacy}",
            received_events_url:
              "https://api.github.com/users/Gregxhill/received_events",
            type: "User",
            site_admin: false,
            name: "Greg Hill",
            company: null,
            blog: "www.linkedin.com/in/gregory-hill-webdvlpr",
            location: "South Africa",
            email: null,
            hireable: null,
            bio: "Aspiring full-stack web developer and Info Management hons graduate.",
            twitter_username: null,
            public_repos: 6,
            public_gists: 0,
            followers: 0,
            following: 0,
            created_at: "2021-02-02T10:09:47Z",
            updated_at: "2021-08-04T15:47:56Z",
          },
          [],
        ]}
        gitBucket={[]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
