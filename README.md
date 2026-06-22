# Gameboxd Android

This is an Android WebView wrapper for the Gameboxd web app.

It also includes a GitHub Pages workflow that can publish the same app online from `app/src/main/assets/www`.

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

## Put it online

1. Upload this project to GitHub.
2. Open the repository settings.
3. Go to **Pages**.
4. Set the source to **GitHub Actions**.
5. Open **Actions**.
6. Run **Publish Web App**.

The online version can use the RAWG API after you paste your own free RAWG API key in the app.
