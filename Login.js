function Login() {
    user_name = document.getElementById("user_name").value;

    localStorage.setItem("user_name", user_name);
    if (user_name == "") {
        window.alert("Please Enter Your Name To Chat With Others");
    }
    else{
        window.location="Fire_chatter_page.html";
    }
}