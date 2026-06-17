import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { NavCollapsible, NavGroup, NavLink } from '@/types';
import { useActiveUrl } from '@/hooks/use-active-url';

export function NavMain({ items = [] }: { items: NavGroup[] }) {
    // const { urlIsActive } = useActiveUrl();
    const { state, isMobile } = useSidebar();

    return items.map((item) => (
        <SidebarGroup className="px-2 py-0" key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu>
                {item.items.map((item, index) => {
                    const key = `${item.title}-${index}`;

                    if (!item.items) {
return <SidebarMenuLink key={key} item={item} />;
}

                    if (state === 'collapsed' && !isMobile) {
return (
                            <SidebarMenuCollapsedDropdown
                                key={key}
                                item={item}
                            />
                        );
}

                    return <SidebarMenuCollapsible key={key} item={item} />;
                })}
            </SidebarMenu>
        </SidebarGroup>
    ));
}

function SidebarMenuLink({ item }: { item: NavLink }) {
    const { urlIsActive } = useActiveUrl();

    return (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
                asChild
                isActive={urlIsActive(item.href)}
                tooltip={{ children: item.title }}
            >
                <Link href={item.href} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

function SidebarMenuCollapsible({ item }: { item: NavCollapsible }) {
    const { setOpenMobile } = useSidebar();
    const { urlIsActive, currentUrl } = useActiveUrl();

    return (
        <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="tests">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                    <SidebarMenuSub>
                        {item.items.map((item) => (
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={urlIsActive(
                                        item.href,
                                        currentUrl,
                                    )}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

function SidebarMenuCollapsedDropdown({ item }: { item: NavCollapsible }) {
    const { urlIsActive, currentUrl } = useActiveUrl();

    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Test">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" sideOffset={4}>
                    <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.items.map((item) => (
                        <DropdownMenuItem asChild>
                            <Link
                                href={item.href}
                                className={cn(
                                    urlIsActive(item.href, currentUrl) &&
                                        'bg-secondary',
                                )}
                            >
                                {item.icon && <item.icon />}
                                <span className="max-w-52 text-wrap">
                                    {item.title}
                                </span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}
