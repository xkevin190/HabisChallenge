import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title, type, handleSubmit} = this.props;
    const color = {
      primary: '#039343',
      secondary: '#d50000',
      other: '#43a047',
    };
    return (
      <TouchableOpacity
        style={{
          backgroundColor: color[type],
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          marginHorizontal: 5,
          minWidth: 100,
          height:'100%'
        }}
        onPress={handleSubmit}>
        <Text style={{fontSize: 15, fontWeight: '400', color: 'white'}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}
