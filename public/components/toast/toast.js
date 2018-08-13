import React, { Component } from 'react';
import { EuiGlobalToastList, EuiPortal } from '@elastic/eui';

let addToastHandler;
let removeAllToastsHandler;
let toastId = 0;

export function addToast(title, content, type) {
  addToastHandler(title, content, type);
}

export function removeAllToasts() {
  removeAllToastsHandler();
}

export default class StatusToast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toasts: []
    };

    addToastHandler = this.addToast;
    removeAllToastsHandler = this.removeAllToasts;
  }

  addToast = (title, content, type) => {
    const toast = {
      title: title,
      text: content,
      color: type,
      id: toastId++
    };

    this.setState({
      toasts: this.state.toasts.concat(toast)
    });
  };

  removeToast = removedToast => {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(toast => toast.id !== removedToast.id)
    }));
  };

  removeAllToasts = () => {
    this.setState({
      toasts: []
    });
  };

  render() {
    return (
      <EuiPortal>
        <EuiGlobalToastList
          toasts={this.state.toasts}
          dismissToast={this.removeToast}
          toastLifeTimeMs={6000}
        />
      </EuiPortal>
    );
  }
}
