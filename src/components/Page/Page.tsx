import React, { FC } from 'react';

import Filters from '../Filters';
import Header from '../Header';
import Results from '../Results';

const Page: FC = () => (
  <div className="container-fluid">
    <div className="row border-bottom">
      <div className="col-sm">
        <Header />
      </div>
    </div>
    <div className="row pt-3" id="main-content">
      <div className="col-sm-4 col-md-3">
        <Filters />
      </div>
      <div className="col-sm-8 col-md-9">
        <Results />
      </div>
    </div>
  </div>
);

export default Page;
