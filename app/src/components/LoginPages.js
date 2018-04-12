import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Message, Segment} from 'semantic-ui-react';
import {Login, LoginCode, Logout} from './Login';

export const LoginPage = connect((state) => ({
  isLogged: Boolean(_.get(state, "auth.token")),
}))(({isLogged}) => (
  <Segment basic>
    {isLogged ? <Logout /> : <Login />}
  </Segment>
));

export const LoginCodePage = () => (
  <Segment basic>
    <LoginCode />
  </Segment>
);

export const LoginErrorPage = () => (
  <Segment basic>
    <Message success>
      <Message.Header>Your login failed :(</Message.Header>
      <p>Same player, try again.</p>
    </Message>
  </Segment>
);
