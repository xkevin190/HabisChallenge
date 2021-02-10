import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Auth from './auth';
import { connect } from 'react-redux';
import { logout, signOff } from '../store/AplicationAction';
import Home from './Home';
import Spinner from '../components/spinner'
class DualApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }


  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
        {this.props.loading && <Spinner />}
        {this.props.auth === 1 && <Auth {...this.props} />}
        {this.props.auth === 2 && <Home order={this.props.order} signOff={this.props.signOff} navigation={this.props.navigation} />}
      </View>
    );
  }
}

const mapStateToProps = (state) => state.app;

export default connect(mapStateToProps, { logout, signOff })(DualApp);
