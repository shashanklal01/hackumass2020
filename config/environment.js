//environment.js
var environments = {
    staging: {
        apiKey: "AIzaSyBO4LviZcsNSLkeJajEDNOOMjiBHaspxiQ",
        authDomain: "hack-umass.firebaseapp.com",
        projectId: "hack-umass",
        storageBucket: "hack-umass.appspot.com",
        messagingSenderId: "407595880345",
        appId: "1:407595880345:web:1676c5af8352630e344d08",
        measurementId: "G-LQ2MB19W1C",
        googleCloudVisionAPI: "AIzaSyAwUZtTmd2BULQ5z1x8JvwsnoJoQm1l95c"
    },
    production: {
        // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
};

function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
        return 'staging';
    } else if (releaseChannel === 'staging') {
        return 'staging';
    } else {
        return 'staging';
    }
}
function getEnvironment(env) {
    console.log('Release Channel: ', getReleaseChannel());
    return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;