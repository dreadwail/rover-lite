import React, { FC } from 'react';

export interface SpinnerProps {
  readonly isLargeSize?: boolean;
}

const Spinner: FC<SpinnerProps> = ({ isLargeSize }) => {
  const style = isLargeSize ? { width: '5rem', height: '5rem' } : {};
  return (
    <div className="d-flex justify-content-center m-5">
      <div className="spinner-border text-primary" style={style} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
