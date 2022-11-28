import React from 'react';
import { useEffect } from 'react';
import { getAccessToken } from '../utils/helper';
import Router from 'next/router';
export const CheckToken = () => {
  const token = getAccessToken();
  useEffect(() => {
    if (!token) {
      Router.replace('/');
    }
  });
  return <></>;
};
