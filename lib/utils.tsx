import React from 'react';

export function titleWithBreaks(title: string): React.ReactNode {
  const parts = title.split('\n');
  if (parts.length === 1) return title;
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}
