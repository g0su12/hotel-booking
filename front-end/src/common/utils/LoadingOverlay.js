// LoadingOverlay.js
import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../reducers/loading';

const LoadingOverlay = () => {
  const isLoading = useSelector(selectLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;
