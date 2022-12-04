const title = document.getElementById("title");
const main = document.getElementById("main");
var cur_y = 0;



// 서버에서 txt 파일 내용을 가져온다.
async function loadInfo() {
    // 현재 유저의 정보를 서버에서 가져온다.
    const formData = new FormData();
    const file_name = window.location.search.split("=")[1];

    formData.append("file_name", file_name);
    // console.log(formData.get("file_name"));
    await fetch("./process/getBook", {method: "POST", body: formData})
      .then((response) => response.json())
      .then((result) => text = result);

      title.textContent = file_name.split(".")[0];
      main.textContent = text;

    await fetch("./process/getScroll", {method: "POST", body: formData})
      .then((response) => response.json())
      .then((result) => cur_y = result.cur_y);
    window.scrollTo(0,cur_y);
}

window.onkeydown = (e) => {
    if(e.key == "ArrowRight") {
        cur_y += screen.height*0.9;
        window.scrollTo(0,cur_y);
    }
    if(e.key == "ArrowLeft") {
        cur_y -= screen.height*0.9;
        window.scrollTo(0,cur_y);
    }
}

setInterval(function() {
    const formData = new FormData();
    cur_y = window.scrollY;
    formData.append("cur_y", cur_y);
    fetch("./process/setScroll", {method: "POST", body: formData});
    //   .then((response) => response.json())
    //   .then((result) => text = result);
},10000);

loadInfo();

