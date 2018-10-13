import React, { Component } from 'react';
import {
  EuiButtonIcon,
  EuiModal,
  EuiOverlayMask,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiFormRow,
  EuiFieldText,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiButton,
} from '@elastic/eui';

export default class CopyModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCopyModalVisible: false,
      newRuleID: `${this.props.rule} (copy)`,
    };
  }

  closeCopyModal = () => {
    this.setState({ isCopyModalVisible: false });
  };

  showCopyModal = () => {
    this.setState({ isCopyModalVisible: true });
  };

  onEditNewRuleID = (e) => {
    this.setState({
      newRuleID: e.target.value,
    });
  }

  onConfirmCopy = () => {
    this.props.handler(this.props.rule, this.state.newRuleID);
  }

  render() {
    let copyModal;

    if (this.state.isCopyModalVisible) {
      copyModal = (
        <EuiOverlayMask>
          <EuiModal
            onClose={this.closeCopyModal}
          >

            <EuiModalHeader>
              <EuiModalHeaderTitle>
                Copy rule - {this.props.rule}
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiFormRow label="Specify name of copy">
                <EuiFieldText
                  name="newRuleID"
                  onChange={this.onEditNewRuleID}
                  value={this.state.newRuleID}
                />
              </EuiFormRow>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={this.closeCopyModal}>
                Cancel
              </EuiButtonEmpty>

              <EuiButton
                onClick={this.onConfirmCopy}
                fill
              >
                Save
              </EuiButton>
            </EuiModalFooter>

          </EuiModal>
        </EuiOverlayMask>
      );
    }

    return (
      <span>
        <EuiButtonIcon
          iconType="copy"
          iconSize="l"
          aria-label={`Copy ${this.props.rule} rule`}
          onClick={this.showCopyModal}
        />
        {copyModal}
      </span>
    );
  }
}
