var firebaseConfig = {
  apiKey: "AIzaSyA7124jP2G_eM2AhJJ9jmukayXSwVkZwmk",
  authDomain: "c-93-8ed10.firebaseapp.com",
  databaseURL: "https://c-93-8ed10-default-rtdb.firebaseio.com",
  projectId: "c-93-8ed10",
  storageBucket: "c-93-8ed10.appspot.com",
  messagingSenderId: "533440922390",
  appId: "1:533440922390:web:a4dca6e92745e7ca968637"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("name").innerHTML = "Welcome " + user_name + "!!!";

function addroom() {
  room_name = document.getElementById('room_name').value;
  firebase.database().ref('/').child(room_name).update({
    purpose: "Add Room Name"
  });

  localStorage.setItem('room_name', room_name);

  window.location = 'Fire_Chatter_Chat.html';
}

function getdata() {
  firebase.database().ref('/').on('value', function (snapshot) {
    document.getElementById('list').innerHTML = "";
    snapshot.forEach(function (childsnapshot) {
      childkey = childsnapshot.key;
      Room_names = childkey;
      row = "<div class='room-name' id=" + Room_names + " onclick='RedirectToRoomName(this.id)'>#" + Room_names + "</div><hr>"
      document.getElementById("list").innerHTML += row;
    });
  });
}

getdata();

function RedirectToRoomName(name) {
  localStorage.setItem('room_name', name);
  window.location = 'Fire_Chatter_Chat.html';
}

function logout(){
  localStorage.removeItem('user_name');
  localStorage.removeItem('room_name');
  window.location = 'Login.html';
}