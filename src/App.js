import React, {Component} from 'react';
import Editor from './Editor';
import Output from './Output';

class App extends Component {
  state = {
    code: `function sum(a,b){
      return a + b
    }`,
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
