import React, { Component } from 'react';
import {
  EuiButton,
  EuiConfirmModal,
  EuiOverlayMask,
  EUI_MODAL_CONFIRM_BUTTON
} from '@elastic/eui';

export default class Dangerous extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDestroyModalVisible: false
    };
  }

  closeDestroyModal = () => {
    this.setState({ isDestroyModalVisible: false });
  };

  showDestroyModal = () => {
    this.setState({ isDestroyModalVisible: true });
  };

  action = () => {
    this.props.action(this);
  }

  render() {
    let destroyModal;

    if (this.state.isDestroyModalVisible) {
      destroyModal = (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={this.props.title}
            onCancel={this.closeDestroyModal}
            onConfirm={this.action}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton={EUI_MODAL_CONFIRM_BUTTON}
          >
            <p>
              {this.props.text}
            </p>
            <p>Are you sure you want to do this?</p>
          </EuiConfirmModal>
        </EuiOverlayMask>
      );
    }

    return (
      <div>
        <EuiButton color="danger" fill onClick={this.showDestroyModal}>
          {this.props.buttonText}
        </EuiButton>
        {destroyModal}
      </div>
    );
  }
}
