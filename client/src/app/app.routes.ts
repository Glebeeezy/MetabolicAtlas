import { Routes } from '@angular/router';

/**
 * Top-level application routes with standalone lazy component loading.
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'atlas',
    pathMatch: 'full',
  },
  {
    path: 'atlas',
    loadComponent: () =>
      import('./features/atlas/atlas-shell.component').then((m) => m.AtlasShellComponent),
    title: 'Atlas | Metabolic Atlas',
  },
  {
    path: 'pathways',
    loadComponent: () =>
      import('./features/pathways/pathways-shell.component').then((m) => m.PathwaysShellComponent),
    title: 'Pathways | Metabolic Atlas',
  },
  {
    path: 'pathways/:id',
    loadComponent: () =>
      import('./features/pathways/pathways-shell.component').then((m) => m.PathwaysShellComponent),
    title: 'Pathway Details | Metabolic Atlas',
  },
  {
    path: 'entities/:type/:id',
    loadComponent: () =>
      import('./features/entities/entities-shell.component').then((m) => m.EntitiesShellComponent),
    title: 'Entity Details | Metabolic Atlas',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search-shell.component').then((m) => m.SearchShellComponent),
    title: 'Search | Metabolic Atlas',
  },
  {
    path: 'textbook',
    loadComponent: () =>
      import('./features/textbook/textbook-shell.component').then((m) => m.TextbookShellComponent),
    title: 'Textbook | Metabolic Atlas',
  },
  {
    path: 'textbook/:chapterId',
    loadComponent: () =>
      import('./features/textbook/textbook-shell.component').then((m) => m.TextbookShellComponent),
    title: 'Textbook Chapter | Metabolic Atlas',
  },
  {
    path: 'articles',
    redirectTo: 'textbook',
    pathMatch: 'full',
  },
  {
    path: 'articles/:slug',
    redirectTo: 'textbook',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Not Found | Metabolic Atlas',
  },
];
