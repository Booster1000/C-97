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
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById('msg').value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        likes: 0
    });
    document.getElementById('msg').value = "";
}

function getdata() {
    firebase.database().ref('/' + room_name).on('value', function (snapshot) {
        document.getElementById('messages').innerHTML = "";
        snapshot.forEach(function (childsnapshot) {
            childkey = childsnapshot.key;
            childData = childsnapshot.val();
            if (childkey != 'purpose') {
                firebase_id = childkey;
                message_data = childData;
                name = message_data['name'];
                likes = message_data['likes'];
                message = message_data['message'];
                name_with_tag = '<h4 id="tag" style="font-size:50px;text-align:left;">' + name + '<img src="tick.png" id="user_tick"></h4>';
                message_with_tag = '<h4 style="font-size:40px;color:yellow;text-align:left;">' + message +'</h4>';
                like_button = "<button class='btn btn-warning' style='font-size:30px;height:60px;margin-left:-1610px;' id=" + firebase_id + " value=" + likes + " onclick='updateLike(this.id)'>";
                thumbs_up = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + likes + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + thumbs_up;
                document.getElementById('messages').innerHTML += row;
            }
        });
    });
}
getdata();

function updateLike(id){
    button_id = id;
    likes_1 = document.getElementById(button_id).value;
    updated_likes = Number(likes_1) + 1;
    firebase.database().ref(room_name).child(id).update({
    likes:updated_likes    
    })
}

function logout() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('room_name');
    window.location = 'Login.html';
}