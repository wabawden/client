import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderAdmin(stream) {
    
      if (stream.userId === this.props.currentUser) {
        return (
          <div className="right floated content">
            <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
            <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>
              Delete
            </Link>
          </div>
        );
    }
  
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <Link to={`/streams/${stream.id}`} className="item" key={stream.id}>
          <div>{this.renderAdmin(stream)}</div>
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </Link>

      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
          Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.streams)
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderList()}
          {this.renderCreate()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams),
    currentUser: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps,{ fetchStreams })(StreamList);