import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NeighborhoodApp from './components/Neighborhood/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<NeighborhoodApp />, document.getElementById('root'));

serviceWorker.register();
