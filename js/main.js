
// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

window.onload = async function GotoOptionPage(){
    const filterData = async () => {
        const response = await fetch(`${backend_base_url}store/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    
    filterData().then((data) => {
        filter = data
        for (let i=0; i < filter.length; i++){
            let id = filter[i]['id']
            let filter_image = filter[i]['filter_image']

            let temp_html = `
                    <!-- 게시글 -->
                    <div class="filter" id="${id}" onclick="page2upload(this.id)">
                        <img src="${backend_base_url}${filter_image}">
                    </div>

            `
            $('#filter-box').append(temp_html)
        }
    })
    
}

function page2upload(id){
    localStorage.setItem('filter_id', id)
    window.location.href = "./imgupload.html"
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