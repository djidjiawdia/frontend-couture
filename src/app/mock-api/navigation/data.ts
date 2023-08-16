/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Tableau de bord',
        type: 'basic',
        // icon: 'mat-solid:home',
        link: '/dashboard',
    },
    {
        id: 'clients',
        title: 'Clients',
        type: 'basic',
        // icon: 'mat-solid:people',
        link: '/clients',
    },
    {
        id: 'users',
        title: 'Utilisateurs',
        type: 'basic',
        // icon: 'mat-solid:people',
        link: '/users',
    },
];
