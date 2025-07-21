import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './src/screens/CameraScreen';
import ParsePreviewScreen from './src/screens/ParsePreviewScreen';
import EditorScreen from './src/screens/EditorScreen';
import ExportPickerScreen from './src/screens/ExportPickerScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="ParsePreview" component={ParsePreviewScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="ExportPicker" component={ExportPickerScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
