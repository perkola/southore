import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'error'
    }
  },

  globalTypes: {
    theme: {
      description: 'Color scheme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'

      useEffect(() => {
        document.body.style.colorScheme = theme
        document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#ffffff'
      }, [theme])

      return <Story />
    },
  ],

  tags: ['autodocs'],
};

export default preview;
