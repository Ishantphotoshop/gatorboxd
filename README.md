# Gameboxd Android

This is an Android WebView wrapper for the Gameboxd web app.

## Build the APK

1. Open this folder in Android Studio.
2. Let Android Studio install or sync the Android Gradle plugin.
3. Choose **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
4. The debug APK will be created under `app/build/outputs/apk/debug/`.

Or from a terminal with Java, Gradle, and the Android SDK installed:

```powershell
gradle assembleDebug
```

The app runs offline and stores ratings, reviews, favorites, and library data locally on the device.
