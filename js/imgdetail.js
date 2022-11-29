
const backend_base_url = 'http://127.0.0.1:8000'
const output_id = localStorage.getItem('output_id')
window.onload = async function getOutputImg(){
    const detailData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/store/images/${output_id}/`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    return response.json();
}
  detailData().then((data) => {
    detail = data
    detail_img = detail['output_img']
    comment = detail['comment_set']
    for (let i=0; i < comment.length; i++){
        let detail_comment = comment[i]['content']
        let temp_html = `
        <style>
        .comments{
            text-align: center;
          }
        .comments:after{
            content: "";
            display: block;
            width: 500px;
            border-bottom: 1px solid #bcbcbc;
            margin: 10px auto;
        }
        </style>
        <div>
            <div class="comments">${detail_comment}</div>
        </div>
        `
        $('#detail-box').append(temp_html)
    }
    let temp1_html = `
    <div class="image-container">
    <img style="width: 600px;" src="${backend_base_url}${detail_img}"</div>
    </div>
    `
    $('#detail_img-box').append(temp1_html)

    
  })
}


async function create_commnet(){
    const content = document.getElementById('input_comment').value

    const response = await fetch (`http://127.0.0.1:8000/store/images/${output_id}/`,{
        headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('access'),
            'content-type' : 'application/json',
        },
        method : 'POST',
        body : JSON.stringify({
            "content": content,
        })
    })
    window.location.replace('imgdetail.html')
}