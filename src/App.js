
import React from 'react';
import IpodContainer from './components/ipod-container';
import TestReactComponent from "./components/TestReactComponent";



class App extends React.Component {

  constructor(props) {
    super(props);
  }
  render()
  {
    return (


        <div>
            <IpodContainer />
        </div>
    );
  };
}

export default App;


