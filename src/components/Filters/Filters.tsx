import React, { FC } from 'react';

import SearchOptions from '../SearchOptions';
import SearchTypes from '../SearchTypes';

const Filters: FC = () => (
  <div className="card">
    <div className="card-body">
      <form>
        <SearchTypes />
        <SearchOptions />
      </form>
    </div>
  </div>
);

export default Filters;
