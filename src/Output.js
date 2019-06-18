import React, {Component} from 'react';
import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

export default class Output extends Component {
  componentDidMount() {}

  render() {
    const ast = parse(this.props.code);
    traverse(ast, {
      enter(path) {
        if (path.node.type === 'Identifier' && path.node.name === 'a') {
          path.node.name = 'ax';
        }
      },
    });
    return (
      <div style={{width: '50%', height: '100vh', border: '1px solid grey'}}>
        {generate(ast).code}
      </div>
    );
  }
}
