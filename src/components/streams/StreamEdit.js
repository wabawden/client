import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';

import StreamForm from './StreamForm';


class StreamEdit extends React.Component {



  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.stream.id, formValues)
  }

  render() {
    if (!this.props.stream) {
      return <div>LOADING...</div>
    }
    return (
      <div>
        <h3>Edit {this.props.stream.title}</h3>
        <StreamForm onSubmit={this.onSubmit} initialValues={this.props.stream} />
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);