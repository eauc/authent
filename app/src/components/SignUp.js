import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {Button, Form, Input, Message} from 'semantic-ui-react';
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

const SignUpForm = (props) => {
  const {handleSubmit, history, userSignUp, valid} = props;
  return (
    <Form onSubmit={handleSubmit((values) => userSignUp(values, history))}>
      <Field name="name" label="Name" component={renderField} type="text" />
      <Field name="password" label="Password" component={renderField} type="password" />
      <Field name="email" label="Email" component={renderField} type="text" />
      <Field name="phoneNumber" label="Phone Number" component={renderField} type="text" />
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
  if (!phoneNumber) {
    errors.phoneNumber = "Required";
  } else if (!/^0\d{9}$/.test(phoneNumber)) {
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

export default reduxForm({
  form: 'signup',
  validate,
  initialValues,
})(withRouter(connect(() => ({}), actions)(SignUpForm)));
