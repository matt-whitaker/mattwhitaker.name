import debounceAnimation from "../../../utils/debounceAnimation";
import React from "react";

export default class ScrollWatcher extends React.PureComponent {
  constructor(props) {
    props.dataTarget.dataset.scroll = window.scrollY;

    super(props);
  }
  componentDidMount() {
    const { scrollTarget, dataTarget = scrollTarget } = this.props;

    this.setState({
      scrollTarget,
      dataTarget,
      onEvent: debounceAnimation(() => {
        dataTarget.dataset.scroll = window.scrollY;
      })
    }, () => {
      scrollTarget.addEventListener('scroll', this.state.onEvent, { passive: true });
    });
  }

  componentWillUnmount() {
    this.state.scrollTarget.removeEventListener('scroll', this.state.onEvent);
  }

  render() {
    return this.props.children;
  }
}