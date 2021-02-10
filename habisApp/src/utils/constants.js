import { ToastAndroid } from 'react-native'
const message = {
  success: ""
}

export const imageName = {
  Pepperoni: require('../utils/img/pizza1.jpg'),
  Margarita: require('../utils/img/pizza4.jpg'),
  Hawaiian: require('../utils/img/pizza5.jpg'),
  Vegetarian: require('../utils/img/pizza8.jpg'),
  Napolitana: require('../utils/img/pizza6.jpg'),
  "Chiken Ranch": require('../utils/img/pizza7.jpg'),
  "BEEF-NORMAL": require('../utils/img/pizza6.jpg'),
  CHEESE: require('../utils/img/pizza5.jpg'),
  "CHICKEN-FAJITA": require('../utils/img/pizza6.jpg'),
}

export const pizzas = [
  {
    flavor: "Pepperoni",
    image: require('../utils/img/pizza1.jpg'),
  },
  {
    flavor: "Margarita",
    image: require('../utils/img/pizza4.jpg'),
  },

  {
    flavor: "Hawaiian",
    image: require('../utils/img/pizza5.jpg'),
  },
  {
    flavor: "Vegetarian",
    image: require('../utils/img/pizza8.jpg'),
  },

  {
    flavor: "Napolitana",
    image: require('../utils/img/pizza6.jpg'),
  },

  {
    flavor: "Chiken Ranch",
    image: require('../utils/img/pizza7.jpg'),
  }

]


export const toast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    1,
    ToastAndroid.BOTTOM,
    25,
    60,
  );
}