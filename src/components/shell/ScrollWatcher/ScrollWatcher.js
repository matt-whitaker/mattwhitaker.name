import debounce from "../../../utils/debounce";
import React from "react";

export default class ScrollWatcher extends React.PureComponent {
  componentDidMount() {
    document.documentElement.dataset.scroll = 0;

    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY;
    };

    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    storeScroll();
  }

  render() {
    return this.props.children || <></>;
  }
}