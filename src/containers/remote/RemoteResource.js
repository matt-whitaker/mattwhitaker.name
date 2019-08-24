import axios from 'axios';
import React from 'react';
import PropTypes from "prop-types";

/**
 * RemoteResource
 *
 * Loads the specified resource, passing the value to the render prop method
 *
 * @example
 * ```
 * <RemoteResource
 *   url="/path/to/resource.json"
 *   render={(data, error) => <.../>}
 * />
 * ```
 */
export default class RemoteResource extends React.PureComponent {
  static propTypes = {
    /**
     * Render callback function; its signature matches the Node callback pattern.
     */
    render: PropTypes.func.isRequired,

    /**
     * Optional method to transform the response
     */
    transform: PropTypes.func
  };

  /**
   * Kick off the request, asynchronously, and set the data to the state.
   * Applies the optional transform function to the data.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const { url, transform } = this.props;
    const { data } = await axios.get(url);

    if (transform) {
      return this.setState({
        data: transform(data)
      });
    }

    this.setState({ data });
  }

  /**
   * Pass the value ot the render prop method. If the state is not set, render nothing.
   * @returns {*}
   */
  render() {
    if (!this.state) {
      return <></>;
    }
    return this.props.render(this.state.data);
  }
}