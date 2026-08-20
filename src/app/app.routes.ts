import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layout/shell/shell').then((m) => m.Shell),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/client-profile/containers/client-profile-page/client-profile-page')
                        .then((m) => m.ClientProfilePage)
            }]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
