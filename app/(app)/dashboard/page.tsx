'use client';

import React from 'react';
import { logoutAction } from '@/app/actions/auth';
import logger from '@/utils/logger';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/session-provider';

const Dashboard = () => {
  const { session, loading, error } = useSession();
  logger.debug('Dashboard.session-->', session);

  if (loading) return <p className="container py-6">Loading session...</p>;
  if (error) return <p className="container  py-6">Error: {error}</p>;

  return (
    <div className="container-wrapper ">
      <div className="container mx-auto py-6">
        <Button onClick={logoutAction}>Logout</Button>
      </div>
    </div>
  );
};

export default Dashboard;
