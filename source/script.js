const nav_links_ChildNodes = document.getElementById("nav_links").getElementsByTagName("a");
var JsonArray;


// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
// drag and drop api 예제

// drag and drop 시 서버에 파일 업로드
async function load() {
  // nav 영역 이벤트 헨들러
  for(var i=0;i<nav_links_ChildNodes.length;i++) {
    nav_links_ChildNodes[i].addEventListener("click", move_navs);
  }


  // 현재 유저의 정보를 서버에서 가져온다.
  var res = fetch('/process/getInfo', {method: "GET"});
   await fetch("/process/getInfo", {method: "GET"})
            .then(response => response.json())
            .then(data => JsonArray = data)
            .catch(error => console.log(error));
  console.log(res);

  console.log(JsonArray);
  // 업로드 된 책 목록 불러오기
  for(var i=0;i<JsonArray.length;i++) {
    console.log(JsonArray[i]);
    create_book(JsonArray[i].originalname);
  }
}

function create_book(name) {
    var book = document.createElement("div");
    book.textContent = name;
    book.className = "m-1 mb-4 bg-light row-lg-2 book";

    document.getElementById("upload").appendChild(book);
}

function dropHandler(ev) {
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            create_book(file.name);
            data.push(file);

            let formData = new FormData();
            
            formData.append("file", file);
            var res = fetch('/process/upload', {method: "POST", body: formData});
            console.log("upload success");
            console.log(res);
        }
      });
    } else {
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }
  function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
  
    ev.preventDefault();
  }
  


// nav 영역 클릭시 화면 전환 function
function move_navs(event) {
    const cur = document.getElementsByClassName("text-secondary")[0];
    const to = event.currentTarget;

    if(cur == to) {
        return;
    }

    to.classList.add("text-secondary");
    to.classList.remove("text-white");
    cur.classList.remove("text-secondary");
    cur.classList.add("text-white");
    
    document.getElementById(cur.name).style.display = "none";
    document.getElementById(to.name).style.display = "block";
}



load();