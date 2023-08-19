'use client'
import React, { useEffect, ReactNode } from 'react';
import ReactGA from 'react-ga4';

interface AnalyticsProps {
  children: ReactNode;
}

const Analytics: React.FC<AnalyticsProps> = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_ANALYTICS_ID as string);
  }, []);

  return <>{children}</>;
};

export default Analytics;
