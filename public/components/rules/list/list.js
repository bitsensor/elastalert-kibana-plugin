import React, { Component } from 'react';
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiPageContentBody,
  EuiButtonIcon,
  EuiLoadingSpinner,
  EuiCallOut,
  EuiSpacer
} from '@elastic/eui';
import { Item } from './item';
import { Editor } from '../editor';
import { Dangerous } from '../../modal';
import { deleteRule } from '../../../lib/elastalert';
import { addToast } from '../../toast/toast';

let loadRulesHandler;

export function loadRules() {
  loadRulesHandler();
}

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rules: [],
      selectedRules: [],
      error: null,
      loading: false
    };

    loadRulesHandler = this.loadRules;
  }

  selectRule = (rule, active) => {
    if (active) {
      this.setState({
        selectedRules: [...this.state.selectedRules, rule]
      });
    } else {
      const copy = [...this.state.selectedRules];
      const index = copy.indexOf(rule);
      copy.splice(index, 1);
      this.setState({ selectedRules: copy });
    }
  };

  componentDidMount() {
    this.loadRules();
  }

  loadRules = () => {
    this.setState({ rules: [], selectedRules: [], loading: true });
    const { httpClient } = this.props;
    httpClient
      .get('../api/elastalert/rules')
      .then(resp => {
        this.setState({ rules: resp.data.rules.sort(), error: null, loading: false });
      })
      .catch(e => {
        this.setState({ error: e.data, loading: false });
      });
  };

  render() {
    const renderList = () => {
      return this.state.rules.map((rule, index) => {
        return (
          <EuiFlexItem key={index}>
            <Item rule={rule} handler={this.selectRule} />
          </EuiFlexItem>
        );
      });
    };

    const renderError = () => {
      return (
        <React.Fragment>
          <EuiSpacer />
          <EuiCallOut
            title={this.state.error.statusCode + ' - ' + this.state.error.error}
            color="danger"
            iconType="cross"
          >
            {this.state.error.message}
          </EuiCallOut>
        </React.Fragment>
      );
    };

    return (
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Rules Overview</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            <EuiFlexGroup gutterSize="s" alignItems="center">
              {!this.state.error && (
                <EuiFlexItem>
                  <Editor
                    httpClient={this.props.httpClient}
                    editorMode="create"
                  />
                </EuiFlexItem>
              )}
              {this.state.selectedRules.length > 0 && (
                <EuiFlexItem>
                  <Dangerous
                    buttonText={'Delete ' + (this.state.selectedRules.length === 1 ? 'rule' : this.state.selectedRules.length + ' rules')}
                    title="Delete rule"
                    text={'You are about to delete ' + (this.state.selectedRules.length === 1 ? 'a rule' : this.state.selectedRules.length + ' rules')}
                    action={(modal) => deleteRule(this.props.httpClient, this.state.selectedRules,
                      () => {
                        modal.closeDestroyModal();
                        addToast(
                          'Deleted successfully',
                          `${this.state.selectedRules.length} rule${this.state.selectedRules.length > 1 ? 's were' : ' was'} successfully deleted`,
                          'success'
                        );
                        loadRules();
                      },
                      (e) => {
                        modal.closeDestroyModal();
                        addToast('Deleting failed', `Rule could not be deleted: (${e.status}) ${e.statusText}`, 'danger');
                      })
                    }
                  />
                </EuiFlexItem>
              )}
              {this.state.selectedRules.length === 1 && (
                <EuiFlexItem>
                  <Editor
                    rule={this.state.selectedRules[0]}
                    httpClient={this.props.httpClient}
                    editorMode="edit"
                  />
                </EuiFlexItem>
              )}
              <EuiFlexItem>
                {!this.state.loading && <EuiButtonIcon
                  size="s"
                  color="primary"
                  onClick={() => this.loadRules()}
                  iconType="refresh"
                  aria-label="Refresh"
                />}
                {this.state.loading && <EuiLoadingSpinner size="l" />}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGrid>{renderList()}</EuiFlexGrid>
          {(!this.state.loading && !this.state.error && this.state.rules.length === 0) && (
            <React.Fragment>
              <EuiSpacer />
              <EuiCallOut
                title="No existing rules"
                color="warning"
                iconType="help"
              >
                No rules were found.
              </EuiCallOut>
            </React.Fragment>
          )}
          {!this.state.loading && this.state.error && renderError()}
        </EuiPageContentBody>
      </EuiPageContent>
    );
  }
}
