import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';


class StreamCreate extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    console.log(meta);
    return (
      <div className="field">
      <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }
  
  onSubmit = (formValues) => {
    console.log(formValues)
    this.props.createStream(formValues)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" label="Enter Title" component={this.renderInput} />
        <Field name="description" label="Enter Description" component={this.renderInput} />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {}
  if (!formValues.title) {
    errors.title = 'Must Enter a Title';
  }

  if (!formValues.description) {
    errors.description = 'Must enter a Descrition';
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'streamCreate', validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);