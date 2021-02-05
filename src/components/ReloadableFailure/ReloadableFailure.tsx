import React, { FC } from 'react';

const reload = () => {
  const ignoreCache = true;
  window.location.reload(ignoreCache);
};

const ReloadableFailure: FC = () => (
  <div className="text-center">
    <p className="text-danger">An error occurred. Please try again in a moment.</p>
    <button type="button" className="btn btn-link" onClick={reload}>
      Click to reload.
    </button>
  </div>
);

export default ReloadableFailure;
