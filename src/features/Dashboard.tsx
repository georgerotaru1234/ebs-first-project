import React from 'react';
import { Layout } from 'ebs-design';
import Navigation from 'components/Nav';
import TopBar from 'components/TopBar';

const Dashboard: React.FC = ({ children }) => {
  return (
    <Layout>
      <TopBar />
      <Navigation />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default Dashboard;
