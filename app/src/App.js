import React from 'react';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {Menu, Segment} from 'semantic-ui-react';

const HomePage = () => (
  <Segment basic>Home page</Segment>
);

const LoginPage = () => (
  <Segment basic>Login page</Segment>
);

const SignUpPage = () => (
  <Segment basic>SignUp page</Segment>
);

export default withRouter(({location: {pathname}}) => {
  return (
    <div>
      <Segment inverted basic>
        <Menu inverted pointing secondary>
          <Menu.Item as={Link} to="/" active={pathname==="/"}>Home</Menu.Item>
          <Menu.Item as={Link} to="/login" active={pathname==="/login"}>Login</Menu.Item>
          <Menu.Item as={Link} to="/signup" active={pathname==="/signup"}>Sign Up</Menu.Item>
        </Menu>
      </Segment>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
    </div>
  );
});
