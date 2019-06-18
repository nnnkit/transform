import React, {Component} from 'react';
import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import Editor from './Editor';
import Output from './Output';

class App extends Component {
  state = {
    code: '',
  };

  onValueChange = code => {
    this.setState({
      code,
    });
  };
  render() {
    return (
      <div style={{display: 'flex'}}>
        <Editor
          value={this.state.code}
          language="javascript"
          onValueChange={this.onValueChange}
        />
        <Output code={this.state.code} />
      </div>
    );
  }
}

export default App;
