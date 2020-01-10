// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVjVs2FiENEUVyN05mnL9ftD0B8dIFjFM",
    authDomain: "highscorestorage.firebaseapp.com",
    databaseURL: "https://highscorestorage.firebaseio.com",
    projectId: "highscorestorage",
    storageBucket: "highscorestorage.appspot.com",
    messagingSenderId: "407629551770",
    appId: "1:407629551770:web:b5ce7c376a3441d7e02723"

};

// Initialize Firebase connection
firebase.initializeApp(firebaseConfig);

// Initialize variable representing the location in the database where we will hold our highscore information
const database = firebase.database().ref('scores');