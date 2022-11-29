// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

// # 검사에서 콘솔 잘 찍히는지 확인 나중에 삭제 //
window.onload = () => {
    console.log("로딩되었음") 
}

// # 회원가입 //
async function handleSignup(){
    const SignupData={
        username : document.getElementById("username").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value,
        passwordcheck : document.getElementById("passwordcheck").value,
        phone_number : document.getElementById("phone_number").value,
    }
    const response = await fetch(`${backend_base_url}users/signup/`, {
        headers:{
            Accept: "application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body: JSON.stringify(SignupData)
    })

    response_json = await response.json()
    
    if (response.status == 201) {
        window.location.replace(`${frontend_base_url}login.html`)
    } else {
        alert("조건에 맞춰 입력해주세요.")
    }
}

// # 로그인 //
async function handleLogin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })

    const response_json = await response.json()


    if (response.status == 200) {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);
    
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(
            function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload); 
    window.location.replace(`${frontend_base_url}main.html`)
} else {
    alert("잘못된 로그인입니다.", response.status)
}

}

//#로그아웃//
async function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")

    window.location.replace(`${frontend_base_url}login.html`)
}


function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
        function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
};