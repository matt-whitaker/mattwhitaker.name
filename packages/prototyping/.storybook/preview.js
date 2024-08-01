import "../style/tailwind.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  core: {
    disableWhatsNewNotifications: true,
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
