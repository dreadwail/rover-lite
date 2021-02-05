import React, { FC } from 'react';

import ExternalLink from '../ExternalLink';

import roverLogo from './rover.png';

const Header: FC = () => (
  <nav className="navbar fixed-top navbar-light bg-white border-bottom">
    <a className="navbar-brand mr-auto ml-3" href="/">
      <img src={roverLogo} alt="Rover" width="100" />
    </a>
    <ExternalLink href="https://www.rover.com/become-a-sitter/" className="nav-item nav-link">
      Become a Sitter
    </ExternalLink>
    <ExternalLink href="https://www.rover.com/help/" className="nav-item nav-link">
      Help
    </ExternalLink>
  </nav>
);

export default Header;
