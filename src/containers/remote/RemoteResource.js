import axios from 'axios';
import React from 'react';
import PropTypes from "prop-types";

/**
 * RemoteResource
 *
 * Loads the specified resource, passing the value to the render prop method
 *
 * Usage:
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
   * @returns {React.Element} The result of passing in the data to the render propr
   */
  render() {
    if (!this.state) {
      return <></>;
    }
    return this.props.render(this.state.data);
  }
}