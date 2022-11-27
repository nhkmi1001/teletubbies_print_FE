// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

window.onload = async function ImageList(){
    const imageData = async () => {
        const response = await fetch(`${backend_base_url}store/images`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    imageData().then((data) => {
        image = data
        console.log(image)
        for (let i=0; i < image.length; i++){
            let id = image[i]['id']
            let user = image[i]['user']
            let output_img = image[i]['output_img']
            let filter = image[i]['filter']
            console.log(image[i]['id'])
            console.log(image[i]['output_img'])
            console.log(image[i]['user'])
            console.log(image[i]['filter'])
            let temp_html = `
                    <!-- 게시글 -->
                    <div class="output_card">
                        <div class="output_img" id="${id}" onclick="location.href='${frontend_base_url}imgdetail.html?id=${id}'">
                            <img src="${backend_base_url}${output_img}">
                        </div>
                        <div class="imglist_username">${user}</div>
                    </div>
        
            `
            $('#output_img-box').append(temp_html)
        }
    })
}