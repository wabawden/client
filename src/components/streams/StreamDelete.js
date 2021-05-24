import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends React.Component {
  
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderAction() {
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(this.props.stream.id)} className="ui button negative">Delete</button>
        <button onClick={() => history.goBack()} className="ui button">Cancel</button>
      </React.Fragment>
    );
  };

  renderContent() {
    if (!this.props.stream) {
      return "are you sure you want to delete this stream?"
    }

    return `are you sure you want to delete this stream with title ${this.props.stream.title}?`
  }

  render() {
    return (
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderAction()}
          onDismiss={() => history.push('/')}
        />
    )
  };
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);