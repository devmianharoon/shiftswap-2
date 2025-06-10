import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard-sales';
import ComponentsAppsCalendar from '@/components/apps/calendar/components-apps-calendar';
// import ComponentsDashboardAnalytics from '@/components/dashboard/components-dashboard-analytics';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sales Admin',
};

const Page = () => {
    return <ComponentsDashboardAnalytics />;
    // return <ComponentsAppsCalendar />;
};

export default Page;
