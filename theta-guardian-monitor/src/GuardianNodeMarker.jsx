import React, {PureComponent} from 'react';
// import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle} from './GuardianNodeMarkerStyle.js';

export default class MyGreatPlace extends PureComponent {
  static defaultProps = {};

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}