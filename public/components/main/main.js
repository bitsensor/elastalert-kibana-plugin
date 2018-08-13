import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageBody,
  EuiButtonIcon,
  EuiToolTip
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { StatusToast } from '../toast';
import List from '../rules/list/list';

export const Main = (props) => (
  <React.Fragment>
    <StatusToast />
    <EuiPage>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>{props.title}</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
          <EuiPageHeaderSection>
            <EuiToolTip position="left" content="Source @ GitHub">
              <EuiButtonIcon
                size="s"
                color="text"
                onClick={() =>
                  window.open(
                    'https://github.com/bitsensor/elastalert-kibana-plugin',
                    '_blank'
                  )
                }
                iconType="logoGithub"
                aria-label="Github"
              />
            </EuiToolTip>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <List httpClient={props.httpClient} />
      </EuiPageBody>
    </EuiPage>
  </React.Fragment>
);
