import { within, userEvent, expect } from '@storybook/test';

import { ImageScroller } from "../components/image-scroller";

export default {
  title: 'ImageScroller',
  component: ImageScroller,
  parameters: {
    layout: 'fullscreen'
  },
};

export const Basic = {
  args: {
    test: "Test"
  },
  play: async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/storybook-worker.js?manifest=image-scroller.json", { scope: "/" });
    }
  }
};