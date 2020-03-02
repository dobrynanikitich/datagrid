import React from 'react';
import { connect } from 'react-redux';

import './App.css';

function App({ isSorted }) {
  console.log(isSorted)
  return (
    <div className="App">
      HELLO WORLD!
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isSorted: state.isSorted,
  }
}

export default connect(mapStateToProps)(App);
