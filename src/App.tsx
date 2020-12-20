import React, { useCallback, useEffect, useState } from 'react';
import Reference from './components/Reference/Reference';

import './styles/App.scss';

const applyBodyStyles = (classNames) => document.body.classList.add(classNames);

function App() {
  const [bodyStyles, setBodyStyles] = useState();
  // // useEffect(() => {
  // console.log('bodyStyles: ', bodyStyles);
  // // }, [bodyStyles]);

  const addBodyStyles = useCallback((styles) => {
    applyBodyStyles(styles);
  }, []);

  useEffect(() => {
    if (bodyStyles) {
      addBodyStyles(bodyStyles);
    }
  }, [addBodyStyles, bodyStyles]);

  return (
    <>
      {/* <Reference setBodyStyles={setBodyStyles} /> */}
      <Reference setBodyStyles={setBodyStyles} />
    </>
  );
}

export default App;
