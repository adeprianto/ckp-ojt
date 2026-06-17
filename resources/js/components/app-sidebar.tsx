import { Link } from '@inertiajs/react';
import {
    BookOpen,
    FileChartColumnIncreasing,
    Files,
    FolderGit2,
    LayoutGrid,
    ListStart,
    Users,
    Map
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
import {dashboard} from '@/routes'
import type { NavGroup, NavItem } from '@/types';

const dashboardNavItems: NavItem[] = [
    {
        title: 'Monitoring',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Maps',
        href: dashboard(),
        icon: Map,
    },
];

const reportNavItems: NavItem[] = [
    {
        title: 'Laporan',
        icon: Files,
        items: [
            {
                title: 'Produksi Harian',
                icon: FileChartColumnIncreasing,
                href: dashboard(),
            },
        ],
    },
];

const personilNavItems: NavItem[] = [
    {
        title: 'Karyawan',
        icon: Users,
        items: [
            {
                title: 'Management Karyawan',
                icon: Users,
                href: dashboard(),
            },
            {
                title: 'Pemetaan Karyawan',
                icon: ListStart,
                href: dashboard(),
            },
        ],
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
        title: 'Personil',
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
                            <Link href={dashboard()} prefetch>
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
