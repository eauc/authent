import React from 'react';
import {Link} from 'react-router-dom';
import {Message, Segment} from 'semantic-ui-react';
import {SignUp, SignUpQrCode} from './SignUp';

export const SignUpPage = () => (
  <Segment basic><SignUp /></Segment>
);

export const SignUpSuccessPage = () => (
  <Segment basic>
    <Message success>
      <Message.Header>Your registration was successful !</Message.Header>
      <p>You may now <Link to="/login">log-in</Link> with the username you have chosen.</p>
    </Message>
    <SignUpQrCode />
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
