import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Message, Segment} from 'semantic-ui-react';
import {SignUp, SignUpConfirm, SignUpQrCode} from './SignUp';

export const SignUpPage = () => (
  <Segment basic><SignUp /></Segment>
);

export const SignUpConfirmPage = connect(({user}) => ({
  hasPhoneNumber: Boolean(_.get(user, "phoneNumber")),
}))(({hasPhoneNumber}) => (
  <Segment basic>
    <Message info>
      <p>Please confirm your phone to complete registration.</p>
      <SignUpConfirm />
    </Message>
    {!hasPhoneNumber ?  <SignUpQrCode /> : ""}
  </Segment>
));

export const SignUpSuccessPage = connect(({user}) => ({
  hasPhoneNumber: Boolean(_.get(user, "phoneNumber")),
}))(({hasPhoneNumber}) => (
  <Segment basic>
    <Message success>
      <Message.Header>Your registration was successful !</Message.Header>
      <p>You may now <Link to="/login">log-in</Link> with the username you have chosen.</p>
    </Message>
  </Segment>
));

export const SignUpErrorPage = () => (
  <Segment basic>
    <Message error>
      <Message.Header>Your registration failed :(</Message.Header>
      <p>Same player, try again.</p>
    </Message>
  </Segment>
);
