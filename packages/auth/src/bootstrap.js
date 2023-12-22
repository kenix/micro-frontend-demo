import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// define mount function to start up the app
const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath}) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if(onNavigate){
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate({pathname: nextPathname}) {
      const {pathname}=history.location;
      if(pathname!==nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

// if we are in dev and isolation call mount right away
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  if (devRoot) {
    mount(devRoot, {defaultHistory: createBrowserHistory()});
  }
}

// we are running through container, export mount function
export { mount };

