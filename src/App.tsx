import Alert from './components/Alert';
import Details from './components/Details';
import Home from './components/Home';
import { ScaleProvider } from './contexts/scaleContext';
import { WeatherProvider } from './contexts/weatherContext';

export default function App() {
  return (
    <WeatherProvider>
      <ScaleProvider>
        <Home />
        <Details />
        <Alert />
      </ScaleProvider>
    </WeatherProvider>
  );
}
