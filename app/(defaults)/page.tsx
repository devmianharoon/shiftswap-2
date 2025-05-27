// import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard-sales';
import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard-analytics';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sales Admin',
};

const Sales = () => {
    return <ComponentsDashboardAnalytics />;
};

export default Sales;
