import { Link } from '@inertiajs/react';
import {
    FileChartColumnIncreasing,
    LayoutGrid,
    ListStart,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home as dashboardHome } from '@/routes/dashboard';
import {
    organizer as dashboardMasterDataOrginizer,
    training as dashboardMasterDataTraining,
} from '@/routes/dashboard/master';
import { trainings as reportTrainings } from '@/routes/dashboard/reports';
import type { NavGroup, NavItem } from '@/types';

const dashboardNavItems: NavItem[] = [
    {
        title: 'Monitoring',
        href: dashboardHome(),
        icon: LayoutGrid,
    },
];

const reportNavItems: NavItem[] = [
    {
        title: 'Laporan Pelatihan',
        icon: FileChartColumnIncreasing,
        href: reportTrainings(),
    },
];

const personilNavItems: NavItem[] = [
    {
        title: 'Penyelenggara Pelatihan',
        icon: Users,
        href: dashboardMasterDataOrginizer(),
    },
    {
        title: 'Pelatihan',
        icon: ListStart,
        href: dashboardMasterDataTraining(),
    },
];

const navItems: NavGroup[] = [
    {
        title: 'Dashboard',
        items: dashboardNavItems,
    },
    {
        title: 'Laporan',
        items: reportNavItems,
    },
    {
        title: 'Master Data',
        items: personilNavItems,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHome()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
