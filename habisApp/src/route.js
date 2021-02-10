import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import DualComponent from './views/index'
import NewOrder from './views/NewOrder'
import Orders from './views/Orders'

export const AppStackNavigator = createStackNavigator({
  inital: DualComponent,
  newOrder: NewOrder,
  orders: Orders
});


// eslint-disable-next-line no-undef
export default RouteContainer = createAppContainer(AppStackNavigator);