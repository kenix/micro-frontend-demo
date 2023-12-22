import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// define mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// if we are in dev and isolation call mount right away
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

// we are running through container, export mount function
export { mount };

