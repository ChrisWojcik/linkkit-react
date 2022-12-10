import React from 'react';
import { createRoot } from 'react-dom/client';

import '@/web/styles/main.scss';

import App from '@/web/App';

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
