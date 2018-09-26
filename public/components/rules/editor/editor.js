import React, { Component } from 'react';
import {
  EuiCodeEditor,
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiFormRow,
  EuiFieldText,
  EuiSpacer
} from '@elastic/eui';
import 'brace/mode/yaml';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import { addToast } from '../../toast/toast';
import { loadRules } from '../list/list';
import { Console } from '../../console';

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      ruleName: '',
      isModalVisible: false,
      saving: false,
      testing: false,
      testResponse: null,
      testFailed: null
    };
  }

  loadRule() {
    const { httpClient } = this.props;
    httpClient.get(`../api/elastalert/rules/${this.props.rule}`).then(resp => {
      this.setState({ value: resp.data, ruleName: this.props.rule });
    });
  }

  saveRule = () => {
    const { httpClient } = this.props;
    this.setState({ saving: true });
    const ruleID = this.props.editorMode === 'edit' ? this.props.rule : this.state.ruleName;

    httpClient
      .post(`../api/elastalert/rules/${ruleID}`, {
        yaml: this.state.value
      })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({ saving: false });
          addToast(
            'Saved successfully',
            `Rule '${ruleID}' was saved successfully`,
            'success'
          );
          this.closeModal();
          loadRules();
        }
      })
      .catch(e => {
        this.setState({ saving: false });
        addToast(
          'Failed to save',
          `Rule '${ruleID}' could not be saved: (${e.status}) ${e.statusText}`,
          'danger'
        );
      });
  };

  testRule = () => {
    const { httpClient } = this.props;
    this.setState({ testing: true, testFailed: null, testResponse: null });

    httpClient
      .post(`../api/elastalert/test`, {
        rule: this.state.value,
        testType: 'schemaOnly'
      })
      .then(resp => {
        this.setState({
          testing: false,
          testFailed: false,
          testResponse: resp.data
        });
      })
      .catch(e => {
        this.setState({
          testing: false,
          testFailed: true,
          testResponse: e.data.message ? e.data.message : e.data,
        });
      });
  };

  onChange = value => {
    this.setState({ value: value });
  };

  setRuleName = e => {
    this.setState({ ruleName: e.target.value });
  };

  closeModal = () => {
    this.setState({ value: '', ruleName: '', isModalVisible: false });
  };

  showModal = () => {
    if (this.props.editorMode === 'edit') {
      this.loadRule();
    }
    this.setState({ isModalVisible: true, testResponse: null });
  };

  render() {
    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeModal} style={{ width: '900px' }}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                {this.props.editorMode === 'edit' ? 'Edit' : 'Create'} rule
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiFormRow label="Rule name">
                <EuiFieldText
                  name="ruleName"
                  value={this.state.ruleName}
                  onChange={this.setRuleName}
                  readOnly={this.props.rule ? true : false}
                  autoFocus={true}
                />
              </EuiFormRow>
              <EuiCodeEditor
                mode="yaml"
                theme="github"
                width="100%"
                height="400px"
                value={this.state.value}
                onChange={this.onChange}
                setOptions={{
                  fontSize: '14px',
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true
                }}
              />
              <EuiSpacer size="m" />
              {this.state.testResponse && (
                <Console
                  hasError={this.state.testFailed}
                  consoleOutput={this.state.testResponse}
                />
              )}
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>
              <EuiButton onClick={this.testRule} isLoading={this.state.testing}>
                {this.state.testing ? 'Testing..' : 'Test'}
              </EuiButton>
              <EuiButton
                fill
                onClick={this.saveRule}
                isLoading={this.state.saving}
              >
                {this.state.saving ? 'Saving..' : 'Save'}
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }
    return (
      <div>
        <EuiButton
          onClick={this.showModal}
          fill={this.props.editorMode === 'edit' ? false : true}
        >
          {this.props.editorMode === 'edit' ? 'Edit rule' : 'Create rule'}
        </EuiButton>
        {modal}
      </div>
    );
  }
}
