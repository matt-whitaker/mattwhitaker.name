import React from 'react';

/**
 * Image
 *
 * Wrapper for an image
 *
 * Usage:
 * ```
 * <Image src="/path/to/image.png">
 *   Alt text
 * </Image>
 * ```
 */
export default class Image extends React.PureComponent {
  /**
   * @returns {React.Element} the image
   */
  render() {
    const { src, children: alt } = this.props;
    return <img src={src} alt={alt} title={alt}/>;
  }
}
