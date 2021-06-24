import React from 'react';
import { Layout } from 'ebs-design';
import Navigation from 'components/Nav';
import TopBar from 'components/TopBar';
import Chart from 'components/Chart';
const Dashboard: React.FC = ({ children }) => {
  return (
    <Layout>
      <TopBar />
      <Navigation />
      <Layout.Content>
        <Chart />
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
