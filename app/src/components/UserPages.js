import React from 'react';
import {connect} from 'react-redux';
import {Header, Segment} from 'semantic-ui-react';

const mapStateToProps = ({user}) => user;

export const UserInfoPage = connect(mapStateToProps)(({name, email, phoneNumber}) => (
  <Segment basic>
    <Header>Name</Header>
    <p>{name}</p>
    <Header>Email</Header>
    <p>{email}</p>
    <Header>phoneNumber</Header>
    <p>{phoneNumber}</p>
  </Segment>
));
