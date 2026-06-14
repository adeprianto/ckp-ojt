import type { ReactNode } from 'react';

export default function DashboardCard({children}: {children: ReactNode}) {
    return <div className="px-4 rounded-sm border-[1.5px]">
        {children}
    </div>
}
