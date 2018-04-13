import _ from 'lodash';
import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Header, Segment} from 'semantic-ui-react';

const mapStateToProps = ({auth, user}) => {
  return {
    ...user,
    isLogged: Boolean(_.get(auth, "token")),
  };
};

export const UserInfoPage = connect(mapStateToProps)(({name, email, isLogged, phoneNumber}) => (
  isLogged ? (
    <Segment basic>
      <Header>Name</Header>
      <p>{name}</p>
      <Header>Email</Header>
      <p>{email}</p>
      <Header>phoneNumber</Header>
      <p>{phoneNumber}</p>
    </Segment>
  ) : (
    <Redirect to="/login"/>
  )
));
