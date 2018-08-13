import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';
import 'ui/autoload/styles';
import { Main } from './components/main';

const app = uiModules.get('apps/elastalertKibanaPlugin');

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false
  });
});

app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

function RootController($scope, $element, $http) {
  const domNode = $element[0];

  // render react to DOM
  render(<Main title="ElastAlert Kibana Plugin" httpClient={$http} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('elastalertKibanaPlugin', RootController);
