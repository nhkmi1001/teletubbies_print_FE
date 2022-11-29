
const backend_base_url = 'http://127.0.0.1:8000/'


const filterId = localStorage.getItem('filter_id')

function setCookie(cookieName, cookieValue, cookieExpire, cookiePath, cookieDomain, cookieSecure){
    var cookieText=escape(cookieName)+'='+escape(cookieValue);
    cookieText+=(cookieExpire ? '; EXPIRES='+cookieExpire.toGMTString() : '');
    cookieText+=(cookiePath ? '; PATH='+cookiePath : '');
    cookieText+=(cookieDomain ? '; DOMAIN='+cookieDomain : '');
    cookieText+=(cookieSecure ? '; SECURE' : '');
    document.cookie=cookieText;
}
 
function getCookie(cookieName){
    var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookieName)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
}

window.onload = () => {
    getFilter();
}

async function getFilter(){
    const response = await fetch(`http://127.0.0.1:8000/store/${filterId}/`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access")
        },
        method:'GET',
    })
    data = await response.json()
    

    let click_image = data['filter_image']

    let temp_html = `
    <div class="image-container">
            <img style="width: 500px;" src="${backend_base_url}${click_image}">
    </div>
    `
    $('#filterImage').append(temp_html)

}

// 인풋이미지 미리보기
const fileInput = document.getElementById("InputImg")
const handleFiles = (e) => {
    const fileReader = new FileReader()
    const selectedFile = fileInput.files;
    fileReader.readAsDataURL(selectedFile[0])
    fileReader.onload = function(){
        document.getElementById("previewImage").src = fileReader.result
    }
}
fileInput.addEventListener("change", handleFiles)

// var headers = new Headers();
// var csrftoken = getCookie('csrftoken');
// headers.append('X-CSRFToken', csrftoken);
// headers.append('Accept', 'application/json, text/plain, */*');
// headers.append('Content-Type', 'application/x-www-form-urlencoded');
// headers.append('Authorization', 'Bearer ' + localStorage.getItem("access"))

async function transferML(){
    const image=document.getElementById("InputImg").files[0]
    const formData = new FormData();

    formData.append('input_img', image);

    const response = await fetch (`http://127.0.0.1:8000/store/${filterId}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
            'Accept': 'application/json'
        },
        method:"POST",
        body: formData
    })
    response_json = response.json();

    if (response.status ==200){


        window.location.replace('imglist.html');

    }else{
        alert("잘못된 로그인입니다.", response.status)
    }
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