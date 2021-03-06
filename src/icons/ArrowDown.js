import React from 'react';
import { useSelector } from 'react-redux';

const ArrowDown = () => {
  const { profile } = useSelector((state) => state.modals);

  const rotate = profile ? 'rotate(180deg)' : 'rotate(0deg)';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ transform: rotate }}
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  );
};

export default ArrowDown;
