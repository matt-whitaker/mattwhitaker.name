import axios from 'axios';
import React from 'react';

/**
 * RemoteResource
 *
 * Loads the specified resource, passing the value to the render prop method
 *
 * @example
 * ```
 * <RemoteResource url="/path/to/resource.json">
 *  {(data) => (
 *    <.../>
 *  )}
 * </RemoteResource>
 * ```
 */
export default class RemoteResource extends React.PureComponent {
  /**
   * Kick off the request, asynchronously, and set the data to the state.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    const { data } = await axios.get(this.props.url);
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
    return this.props.children(this.state.data);
  }
}