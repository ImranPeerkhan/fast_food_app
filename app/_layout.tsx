import {SplashScreen, Stack} from "expo-router";
import './globals.css';
import {useFonts} from "expo-font";
import {useEffect}  from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://f59cf04318025d1b98548d531c5b2624@o4509545899425792.ingest.us.sentry.io/4509704341487616',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {

  const {isLoading, fetchAuthenticatedUser} = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
      }
  )
  useEffect(() => {
    if(error) throw error;
    // Fonts are loaded, you can perform any actions that require the fonts here
    if(fontsLoaded){
      console.log('loaded fonts');
      SplashScreen.hideAsync()
    }

  }, [fontsLoaded, error]);
  useEffect(() => {
    // Fetch the authenticated user when the app starts
    fetchAuthenticatedUser();
  }, []);

  if(!fontsLoaded || isLoading) {
    return null;
  }
  return <Stack screenOptions={{headerShown: false}}/>;
});