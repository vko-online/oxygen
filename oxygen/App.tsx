import React, { useState } from 'react'
import { Platform, YellowBox, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-native-paper'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { theme } from 'src/constants/Colors'
import AppNavigator from 'src/navigation/AppNavigator'

YellowBox.ignoreWarnings(['Require cycle'])
export default function App (props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <Provider theme={theme}>
            <AppNavigator />
          </Provider>
      </View>
    )
  }
}

async function loadResourcesAsync () {
  await Promise.all([
    Asset.loadAsync([
      require('src/assets/images/robot-dev.png'),
      require('src/assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      'opensans-bold': require('src/assets/fonts/OpenSans-Bold.ttf'),
      'opensans-bold-italic': require('src/assets/fonts/OpenSans-BoldItalic.ttf'),
      'opensans-extra-bold': require('src/assets/fonts/OpenSans-ExtraBold.ttf'),
      'opensans-extra-bold-italic': require('src/assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
      'opensans-italic': require('src/assets/fonts/OpenSans-Italic.ttf'),
      'opensans-light': require('src/assets/fonts/OpenSans-Light.ttf'),
      'opensans-light-italic': require('src/assets/fonts/OpenSans-LightItalic.ttf'),
      'opensans-regular': require('src/assets/fonts/OpenSans-Regular.ttf'),
      'opensans-semi-bold': require('src/assets/fonts/OpenSans-SemiBold.ttf'),
      'opensans-semi-bold-italic': require('src/assets/fonts/OpenSans-SemiBoldItalic.ttf'),
      'antoutline': require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
      'antfill': require('@ant-design/icons-react-native/fonts/antfill.ttf')
    })
  ])
}

function handleLoadingError (error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading (setLoadingComplete) {
  setLoadingComplete(true)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
