import React from 'react';
import {Message, Segment} from 'semantic-ui-react';
import {Login, LoginCode} from './Login';

export const LoginPage = () => (
  <Segment basic>
    <Login />
  </Segment>
);

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
