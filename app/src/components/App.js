import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import {Menu, Segment} from 'semantic-ui-react';
import actions from '../actions';
import {LoginPage, LoginCodePage, LoginErrorPage} from './LoginPages';
import {SignUpPage, SignUpSuccessPage, SignUpErrorPage} from './SignUpPages';
import {UserInfoPage} from './UserPages';

const mapStateToProps = ({auth}) => {
  return {
    auth,
    isLogged: Boolean(_.get(auth, "token")),
  };
};

export default withRouter(connect(mapStateToProps, actions)(({auth, isLogged, userInfo, location: {pathname}}) => {
  return (
    <div>
      <Segment inverted basic>
        <Menu inverted pointing secondary>
          <Menu.Item as={Link} to="/" active={pathname==="/"}>Home</Menu.Item>
	  <Menu.Item as={Link} to="/login" active={pathname.startsWith("/login")}>
	    {isLogged ? "Logout" : "Login"}
	  </Menu.Item>
          {isLogged ? " " : <Menu.Item as={Link} to="/signup" active={pathname.startsWith("/signup")}>Sign Up</Menu.Item>}
        </Menu>
      </Segment>
      <Switch>
        <Route exact path="/" render={getUserInfo({auth, userInfo})}/>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/login/code" component={LoginCodePage} />
        <Route exact path="/login/error" component={LoginErrorPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/signup/success" component={SignUpSuccessPage} />
        <Route exact path="/signup/error" component={SignUpErrorPage} />
      </Switch>
    </div>
  );
}));

function getUserInfo({auth, userInfo}) {
  return ({history}) => {
    userInfo(auth, history);
    return (<UserInfoPage />);
  };
}
