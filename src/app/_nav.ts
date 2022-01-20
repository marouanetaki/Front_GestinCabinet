import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Patients',
    url: '/patients',
    icon: 'icon-people'
  },
  {
    name: 'Rendez-vous',
    url: '/rdvs',
    icon: 'icon-calendar'
  },
  {
    name: 'Dossiers Medical',
    url: '/dossiers',
    icon: 'icon-notebook'
  },
  {
    name: 'Specialité',
    url: '/specialites',
    icon: 'icon-eyeglass'
  },
  {
    name: 'Medecins',
    url: '/medecins',
    icon: 'icon-user-following'
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart',
    badge: {
      variant: 'primary',
      text: 'NEW'
    }
  },
  /*{
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },*/
];
