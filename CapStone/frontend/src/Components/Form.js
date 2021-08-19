import React from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

export default function Form({
  userName,
  setUserName,
  setSubmit,
  setIsLoading,
}) {
  //this component returns a formatted form. It contains one textfield for the username and updates the userName state whenever the user enters a new value
  return (
    <>
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Find a user
          </Typography>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="username"
                  placeholder="Enter username"
                  variant="outlined"
                  fullWidth
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>

              <Grid xs={12} item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  // once the user hits submit the useEffect hook is executed and the api called with the username entered
                  onClick={(e) => {
                    e.preventDefault();
                    setSubmit(true);
                    setIsLoading(true);
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
