import React from 'react';

import './PageNotFound.css';
import NavigationPanel from '../../containers/NavigationPanel';

function PageNotFound() {
  return (
    <div className="page-not-found">
      <NavigationPanel/>
      <p className="page-not-found__title">404</p>
    </div>);
}

export default PageNotFound;