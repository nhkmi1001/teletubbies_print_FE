const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

const payload = localStorage.getItem('payload')
const personObj = JSON.parse(payload)
const userId = personObj['user_id']




window.onload = async function MyPage(){

    const MyData = async () => {
        const response = await fetch(`${backend_base_url}users/${userId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    MyData().then((data) => {
        user = data.image_set
        for (let i=0; i < user.length; i++) {
           let img_set = user[i]['output_img']

            let temp_html = `
                    <!-- 내가 선택한 사진들 -->
                    <div class="user"  id="${img_set}" onclick="page2detail()" >
                        <img src="http://127.0.0.1:8000${img_set}" ">
                    </div>
        
            `
            $('#user_box').append(temp_html)
        }
    })
}

function page2detail(){
    window.location.href = "./imgdetail.html"
}

//#로그아웃//
async function logout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")

    window.location.replace(`${frontend_base_url}login.html`)
}