# To update the splash screen

yarn react-native generate-bootsplash assets/logo.png \
 --platforms=android,ios,web \
 --background=F77737 \
 --logo-width=100 \
 --assets-output=assets

# To update app icon

npx icon-set-creator create assets/logo.png

# To rename app

- on /android/app/build.gradle, change applicationId to "com.example"
  npx react-native-rename "YourAppName"

# Demo
![Animation](assets/react_native.gif)