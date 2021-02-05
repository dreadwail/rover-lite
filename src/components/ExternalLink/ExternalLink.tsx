import React, { FC } from 'react';

export interface ExternalLinkProps {
  readonly href: string;
  readonly className?: string;
}

const ExternalLink: FC<ExternalLinkProps> = ({ href, className, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

export default ExternalLink;
