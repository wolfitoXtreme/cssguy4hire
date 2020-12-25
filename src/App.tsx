import React, { useState } from 'react';

import Reference from './components/Reference/Reference';

import './styles/App.scss';

const applyBodyStyles = (classNames) => document.body.classList.add(classNames);

function App() {
  const [bodyStyles, setBodyStyles] = useState();

  if (bodyStyles) {
    applyBodyStyles(bodyStyles);
  }

  return (
    <>
      {/* <Reference setBodyStyles={setBodyStyles} /> */}
      <Reference setBodyStyles={setBodyStyles} />
    </>
  );
}

export default App;
