import ComponentsAppsCalendar from '@/components/apps/calendar/components-apps-calendar';
// import ComponentsDashboardSales from '@/components/dashboard/components-dashboard-sales';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sales Admin',
};

const Sales = () => {
    // return <ComponentsDashboardSales />;
    return <ComponentsAppsCalendar />;


};

export default Sales;
