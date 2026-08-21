import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout/shell/shell').then((m) => m.Shell),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'clients/147842'
            },
            {
                path: 'clients/:id',
                loadComponent: () =>
                    import('./features/client-profile/containers/client-profile-page/client-profile-page')
                        .then((m) => m.ClientProfilePage)
            },
            {
                path: 'clients/:id/financials',
                loadComponent: () =>
                    import(
                        './features/client-profile/pages/financial-breakdown/financial-breakdown'
                    ).then((m) => m.FinancialBreakdown)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'clients/147842'
    }
];
