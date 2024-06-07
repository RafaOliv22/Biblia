import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Book from './src/components/book.component';
import BookDetails from './src/components/bookDetails.component';
import Chapter from './src/components/chapter.component';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3F51B5', 
    background: '#fff', 
    card: '#FFFFFF', 
    text: '#333333', 
    border: '#E0E0E0', 
  },
};
//terste
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Bíblia Digital"
        screenOptions={{
          headerStyle: {
            backgroundColor: MyTheme.colors.primary, 
          },
          headerTintColor: '#FFFFFF', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      >
        <Stack.Screen name="Bíblia Digital" component={Book} />
        <Stack.Screen name="Capítulos" component={BookDetails} />
        <Stack.Screen name="Versículos" component={Chapter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
