# Braze/React Native SDK Example

This is a small integration of braze SDK with react-native.

Please follow the official documentation of react-native to run a project. [Docs](https://reactnative.dev/docs/environment-setup)


## API Keys:

### For iOS:
In the file: `ios/rn_braze_example/AppDelegate.mm` replace  `IOS-API-KEY` & `IOS-CUSTOM-ENDPOINT` with your credentials.


### For android:
In the file `android/app/src/main/java/com/rn_braze_example/MainApplication.java`  replace `ANDROID-API-KEY` & `ANDROID-CUSTOM-ENDPOINT` with your credentials 


### Test Users:
Modify `src/screens/Home/HomeScreen.tsx` to change the user and also modify the file `src/screens/Enrollment/EnrollmentScreen.tsx` to add a `pet_id`
