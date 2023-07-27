import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import './../src/index.css'

const customViewports = {
  minPhone: {
    name: 'Min Phone',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  maxPhone: {
    name: 'Max Phone',
    styles: {
      width: '767px',
      height: '1024px',
    },
  },
  minTablet: {
    name: 'Min Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  maxTablet: {
    name: 'Max Tablet',
    styles: {
      width: '1023px',
      height: '1024px',
    },
  },
  minDesktop: {
    name: 'Min Desktop',
    styles: {
      width: '1024px',
      height: '1024px',
    },
  },
  maxDesktop: {
    name: 'Max Desktop',
    styles: {
      width: '1440px',
      height: '1024px',
    },
  },
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
}

export default preview
