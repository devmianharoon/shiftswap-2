'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';
import IconMenuChat from '@/components/icon/menu/icon-menu-chat';
import IconMenuMailbox from '@/components/icon/menu/icon-menu-mailbox';
import IconMenuTodo from '@/components/icon/menu/icon-menu-todo';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes';
import IconMenuScrumboard from '@/components/icon/menu/icon-menu-scrumboard';
import IconMenuContacts from '@/components/icon/menu/icon-menu-contacts';
import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice';
import IconMenuCalendar from '@/components/icon/menu/icon-menu-calendar';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements';
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts';
import IconMenuWidgets from '@/components/icon/menu/icon-menu-widgets';
import IconMenuFontIcons from '@/components/icon/menu/icon-menu-font-icons';
import IconMenuDragAndDrop from '@/components/icon/menu/icon-menu-drag-and-drop';
import IconMenuTables from '@/components/icon/menu/icon-menu-tables';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages';
import IconMenuAuthentication from '@/components/icon/menu/icon-menu-authentication';
import IconMenuDocumentation from '@/components/icon/menu/icon-menu-documentation';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { ArrowLeftRight, LayoutDashboard, CalendarClock, Users2, Layers3, FileBarChart, Settings, UserRound } from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const userData = localStorage.getItem('user_data');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    console.log(parsedUserData);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    return (
        <div className={semidark ? 'light' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">VRISTO</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            <li className="nav-item">
                                <Link href="/dashboard/apps/calendar" className="group">
                                    <div className="flex items-center">
                                        <LayoutDashboard className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                    </div>
                                </Link>
                            </li>
                            {/* {parsedUserData.account_type === 'member' && (
                                
                            )} */}

                            <li className="nav-item">
                                <ul>
                                    {/* <li className="nav-item">
                                        <Link href="/dashboard/apps/chat" className="group">
                                            <div className="flex items-center">
                                                <CalendarClock className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('My Shifts')}</span>
                                            </div>
                                        </Link>
                                    </li> */}
                                    {parsedUserData.roles?.some((role: string) => ['authenticated'].includes(role)) && (
                                        <>
                                            <li className="nav-item">
                                                <Link href="/dashboard/swap-requests" className="group">
                                                    <div className="flex items-center">
                                                        <ArrowLeftRight className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Swap Requests')}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/dashboard/my-swap-requests" className="group">
                                                    <div className="flex items-center">
                                                        <ArrowLeftRight className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('My Swap Requests')}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/dashboard/apps/chat" className="group">
                                                    <div className="flex items-center">
                                                        <CalendarClock className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Chats')}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {parsedUserData.roles?.some((role: string) => ['business_admin'].includes(role)) && (
                                        <>
                                            <li className="nav-item">
                                                <Link href="/dashboard/manage-swap-requests" className="group">
                                                    <div className="flex items-center">
                                                        <ArrowLeftRight className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Manage Swap Requests')}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/dashboard/apps/calendar" className="group">
                                                    <div className="flex items-center">
                                                        <CalendarClock className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Shifts')}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/dashboard/groups" className="group">
                                                    <div className="flex items-center">
                                                        <Layers3 className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Groups')}</span>
                                                    </div>
                                                </Link>
                                                {/* <li className="nav-item">
                                    <Link href="/dashboard/apps/contacts" className="group">
                                        <div className="flex items-center">
                                            <FileBarChart className="shrink-0 group-hover:!text-primary" />
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Reports')}</span>
                                        </div>
                                    </Link>
                                </li> */}
                                                {/* <li className="nav-item">
                                    <Link href="/dashboard/apps/contacts" className="group">
                                        <div className="flex items-center">
                                            <Settings className="shrink-0 group-hover:!text-primary" />
                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings')}</span>
                                        </div>
                                    </Link>
                                </li> */}

                                                <li className="nav-item">
                                                    <Link href="/dashboard/members" className="group">
                                                        <div className="flex items-center">
                                                            <UserRound className="shrink-0 group-hover:!text-primary" />
                                                            <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Members')}</span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </li>
                                            <li className="nav-item">
                                                <Link href="/dashboard/apps/chat" className="group">
                                                    <div className="flex items-center">
                                                        <CalendarClock className="shrink-0 group-hover:!text-primary" />
                                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Chats')}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </li>

                            <li className="menu nav-item">
                                {/* <button type="button" className={`${currentMenu === 'analytics' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('analytics')}> */}
                                {/* <Link href="/analytics" className="group">
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('analytics')}</span>
                                    </div>
                                </Link> */}
                                {/* </button> */}

                                <AnimateHeight duration={300} height={currentMenu === 'analytics' ? 'auto' : 0}></AnimateHeight>
                            </li>
                            {/* <li className="nav-item">
                                <Link href="/dashboard/apps/contacts" className="group">
                                    <div className="flex items-center">
                                        <Users2 className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">{t('Teams')}</span>
                                    </div>
                                </Link>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
