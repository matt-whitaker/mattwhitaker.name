import { addons } from '@storybook/manager-api';

addons.setConfig({
  panelPosition: 'bottom',
  enableShortcuts: false,
  showToolbar: false,
  theme: undefined,
  selectedPanel: undefined,
  initialActive: 'canvas',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});