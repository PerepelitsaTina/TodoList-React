import React from 'react';
import Todos from './components/Todos';

class App extends React.Component {
  render() {
    return (
      <div>
        <p className="head-title">todolist</p>

        <Todos />
      </div>
    )
  }
}

export default App;
