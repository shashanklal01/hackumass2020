// firebase.js
import * as firebase from 'firebase';
import Environment from './environment';

firebase.initializeApp({
    apiKey: Environment['apiKey'],
    authDomain: Environment['authDomain'],
    projectId: Environment['projectId'],
    storageBucket: Environment['storageBucket'],
    messagingSenderId: Environment['messagingSenderId'],
    appId: Environment['appId'],
    measurementId: Environment['measurementId']
});

export default firebase;