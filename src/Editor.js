import React, {Component} from 'react';
import * as monaco from 'monaco-editor';
import dark from './theme/dark';

/**
 * Use prettier to format JavaScript code.
 * This will replace the default formatter.
 */
monaco.languages.registerDocumentFormattingEditProvider('javascript', {
  async provideDocumentFormattingEdits(model) {
    const prettier = await import('prettier/standalone');
    const babylon = await import('prettier/parser-babylon');
    const text = prettier.format(model.getValue(), {
      parser: 'babylon',
      plugins: [babylon],
      singleQuote: true,
    });

    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ];
  },
});

/**
 * Sync all the models to the worker eagerly.
 * This enables intelliSense for all files without needing an `addExtraLib` call.
 */
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

/**
 * Configure the typescript compiler to detect JSX and load type definitions
 */
const compilerOptions = {
  allowJs: true,
  allowSyntheticDefaultImports: true,
  alwaysStrict: true,
  jsx: 'React',
  jsxFactory: 'React.createElement',
};

monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
  compilerOptions,
);
monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
  compilerOptions,
);
class Editor extends Component {
  componentDidMount() {
    const {path, value, language, onValueChange, ...options} = this.props;
    const model = monaco.editor.createModel(value, language, path);
    this._editor = monaco.editor.create(this._node, options);
    this._editor.setModel(model);
    this._subscription = model.onDidChangeContent(() => {
      this.props.onValueChange(model.getValue());
    });
  }

  componentWillUnmount() {
    this._editor && this._editor.dispose();
    this._subscription && this._subscription.dispose();
  }

  render() {
    return (
      <div
        id="container"
        style={{width: '50%', height: '100vh', border: '1px solid grey'}}
        ref={c => (this._node = c)}
      />
    );
  }
}

export default Editor;
