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
 *   [cache=={Map}]
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
    transform: PropTypes.func,

    /**
     *
     */
    cache: PropTypes.object,
  };

  /**
   * Kick off the request, asynchronously, and set the data to the state.
   * Applies the optional transform function to the data.
   */
  async componentDidMount() {
    const { url, transform, cache } = this.props;

    if (cache && cache.has('url')) {
      return this.setState({
        data: transform ? transform(cache.get('url')) : cache.get('url'),
      });
    }

    const { data } = await axios.get(url);

    if (cache) {
      cache.set(url, data);
    }

    return this.setState({
      data: transform ? transform(data) : data,
    });
  }

  /**
   * @returns {React.Element} The result of passing in the data to the render props
   */
  render() {
    if (!this.state) {
      return <></>;
    }
    return this.props.render(this.state.data);
  }
}