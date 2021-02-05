import React, { FC } from 'react';

import { Listing } from '../../state/results/types';
import ExternalLink from '../ExternalLink';

export interface ResultProps {
  readonly listing: Listing;
}

const Result: FC<ResultProps> = ({ listing }) => {
  const {
    thumbnailUrl,
    name,
    rank,
    webUrl,
    tagline,
    neighborhood,
    city,
    state,
    zip,
    repeatClientCount,
    reviewCount,
    featuredReview,
    currencySymbol,
    price,
    priceUnit,
  } = listing;

  const locationParts = [neighborhood, city, state].filter(part => !!part);
  const location = `${locationParts.join(', ')} ${zip}`;

  return (
    <div className="row">
      <div className="col">
        <img src={thumbnailUrl} alt={name} className="img-thumbnail img-fluid mx-auto d-block" />
      </div>
      <div className="col-sm-7 col-md-8">
        <div className="text-center text-sm-left">
          <p className="lead mb-0">
            {rank}. <ExternalLink href={webUrl}>{name}</ExternalLink>
          </p>
          <p className="mb-0">{tagline}</p>
          <p className="mb-0">{location}</p>
          <div className="my-1">
            <a href="/" className="badge badge-light border mr-1 text-uppercase">
              {repeatClientCount} repeat clients
            </a>
            <a href="/" className="badge badge-light border mr-1 text-uppercase">
              {reviewCount} reviews
            </a>
          </div>
          <p className="text-muted">
            <em>"{featuredReview}"</em>
          </p>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="d-flex flex-column text-center">
          <span>from</span>
          <span className="lead text-danger font-weight-bold">
            {currencySymbol}
            {price}
          </span>
          <span>per {priceUnit}</span>
        </div>
      </div>
    </div>
  );
};

export default Result;
