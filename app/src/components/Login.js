import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {Button, Checkbox, Form, Input, Message, Segment} from 'semantic-ui-react';

import actions from '../actions';

const renderField = (props) => {
  const {input, label, name, type, meta: {touched, error}} = props;
  return (
    <Form.Field>
      <label>{label}</label>
      <Input {...input} name={name} placeholder={label} type={type} />
      <Message error visible={Boolean(touched && error)}>{error}</Message>
    </Form.Field>
  );
};

const renderToggle = (props) => {
  const {input: {value, onChange}, ...rest} = props;
  console.log(props);
  return (
    <Form.Field>
      <Checkbox {...rest}
                defaultChecked={!!value}
                onChange={(e, data) => onChange(data.checked)}
                toggle type="checkbox" />
    </Form.Field>
  );
};

const LoginForm = (props) => {
  const {authLogin, handleSubmit, history, valid} = props;
  return (
    <Form onSubmit={handleSubmit((values) => {console.log(values); authLogin(values, history);})}>
      <Field name="email" label="Email" component={renderField} type="email" />
      <Field name="password" label="Password" component={renderField} type="password" />
      <Field name="sendSMS" label="Get my code by SMS" component={renderToggle} />
      <Button type="submit" primary disabled={!valid}>
        Login
      </Button>
    </Form>
  );
};

const LoginCodeForm = (props) => {
  const {authState, authLoginCode, handleSubmit, history, valid} = props;
  return (
    <Form onSubmit={handleSubmit((values) => authLoginCode(authState, values, history))}>
      <Field name="code" label="Code" component={renderField} type="text" />
      <Button type="submit" primary disabled={!valid}>
        Validate
      </Button>
    </Form>
  );
};

const validateLogin = ({password, email}) => {
  const errors = {};
  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Must be a valid email address";
  }
  if (!password) {
    errors.password = "Required";
  }
  return errors;
};

const validateLoginCode = ({code}) => {
  const errors = {};
  if (!code) {
    errors.code = "Required";
  } else if (!/^\d{6}$/.test(code)) {
    errors.code = "Must be a valid phone number";
  }
  return errors;
};

const initialValues = process.env.NODE_ENV === "production" ? {} : {
  email: "toto@titi.fr",
  password: "mypass",
  sendSMS: false,
};

export const Login = reduxForm({
  form: 'login',
  validateLogin,
  initialValues,
})(withRouter(connect(() => ({}), actions)(LoginForm)));

const mapStateToProps = (state) => {
  return {
    authState: _.get(state, "auth"),
  };
};

export const LoginCode = reduxForm({
  form: 'login-code',
  validateLoginCode,
})(withRouter(connect(mapStateToProps, actions)(LoginCodeForm)));

export const Logout = connect(
  () => ({}),
  (dispatch) => ({
    authLogout: () => dispatch({
      type: "AUTH_LOGOUT",
    }),
  })
)(({authLogout}) => (
  <Segment basic>
    <p>You are Logged in.</p>
    <Button primary onClick={authLogout}>
      Log out
    </Button>
  </Segment>
));
