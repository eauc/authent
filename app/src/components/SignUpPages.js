import React from 'react';
import {Message, Segment} from 'semantic-ui-react';
import SignUp from './SignUp';

export const SignUpPage = () => (
  <Segment basic><SignUp /></Segment>
);

export const SignUpSuccessPage = () => (
  <Segment basic>
    <Message success>
      <Message.Header>Your registration was successful !</Message.Header>
      <p>You may now log-in with the username you have chosen.</p>
    </Message>
  </Segment>
);

export const SignUpErrorPage = () => (
  <Segment basic>
    <Message error>
      <Message.Header>Your registration failed :(</Message.Header>
      <p>Same player, try again.</p>
    </Message>
  </Segment>
);
