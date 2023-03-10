import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/HomeScreen'
import JoinGameScreen from './screens/JoinGameScreen'
import GameScreen from './screens/GameScreen'
import PlayScreen from './screens/PlayScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="JoinGame" component={JoinGameScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
