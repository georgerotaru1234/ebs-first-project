import React from 'react';
import Navigation from 'components/Nav';
import Statistics from 'components/Statistics';

const Dashboard: React.FC = ({ children }) => {
  return (
    <div className="dashboard-wrapper">
      <Navigation />
      <div className="fix-content-overflow"></div>
      <div className="wrapper">
        <Statistics />
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
