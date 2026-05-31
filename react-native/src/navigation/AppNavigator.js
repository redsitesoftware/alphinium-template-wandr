import React from 'react';
import { useTravelStore } from '../store/travelStore';
import HomeScreen from '../screens/HomeScreen';
import DestinationScreen from '../screens/DestinationScreen';

export default function AppNavigator() {
  const phase = useTravelStore(s => s.phase);
  if (phase === 'destination' || phase === 'search') return <DestinationScreen />;
  return <HomeScreen />;
}
