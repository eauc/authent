import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {Button, Form, Image, Input, Message} from 'semantic-ui-react';
import actions from "../actions";

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

const phoneNumber = (value) => {
  if (!value) {
    return value;
  }
  return value.replace(/\s+/g, '');
};

const SignUpForm = (props) => {
  const {handleSubmit, history, userSignUp, valid} = props;
  return (
    <Form onSubmit={handleSubmit((values) => userSignUp(values, history))}>
      <Field name="name" label="Name" component={renderField} type="text" />
      <Field name="password" label="Password" component={renderField} type="password" />
      <Field name="email" label="Email" component={renderField} type="email" />
      <Field name="phoneNumber" label="Phone Number" component={renderField} type="tel" normalize={phoneNumber} />
      <Button type="submit" primary disabled={!valid}>
        Create Account
      </Button>
    </Form>
  );
};

const validate = ({name, password, email, phoneNumber}) => {
  const errors = {};
  if (!name) {
    errors.name = "Required";
  } else if (name.length < 4) {
    errors.name = "Must be at least 4 characters";
  }
  if (!password) {
    errors.password = "Required";
  } else if (password.length < 4) {
    errors.password = "Must be at least 4 characters";
  }
  if (!email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Must be a valid email address";
  }
  if (phoneNumber && !/^0\d{9}$/.test(phoneNumber)) {
    errors.phoneNumber = "Must be a valid phone number";
  }
  return errors;
};

const initialValues = process.env.NODE_ENV === "production" ? {} : {
  name: "toto",
  password: "mypass",
  email: "toto@titi.fr",
  phoneNumber: "0123456789",
};

export const SignUp = reduxForm({
  form: 'signup',
  validate,
  initialValues,
})(withRouter(connect(() => ({}), actions)(SignUpForm)));

export const SignUpQrCode = connect(
  ({user}) => ({
    qrcode: _.get(user, "qrcode", null),
    secret: _.get(user, "secret", null),
  })
)(({qrcode, secret}) => (
  <Message info>
    <p>Please scan this QR Code or enter this secret key in Google Authenticator Application in order to get your verification codes.</p>
    <pre>{secret}</pre>
    <Image alt="Google Authenticator QR Code" centered src={qrcode} />
  </Message>
));

const SignUpConfirmForm = (props) => {
  const {handleSubmit, history, userSignUpConfirm, valid} = props;
  return (
    <Form onSubmit={handleSubmit((values) => userSignUpConfirm(values, history))}>
      <Field name="code" label="Confirmation code" component={renderField} type="text" />
      <Button type="submit" primary disabled={!valid}>
        Confirm Phonenumber
      </Button>
    </Form>
  );
};

export const SignUpConfirm = reduxForm({
  form: 'signup-confirm',
})(withRouter(connect(() => ({}), actions)(SignUpConfirmForm)));
