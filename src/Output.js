import React, {Component} from 'react';

export default class Output extends Component {
  render() {
    return (
      <div style={{width: '50%', height: '100vh', border: '1px solid grey'}}>
        {this.props.code}
      </div>
    );
  }
}
