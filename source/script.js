const nav_links_ChildNodes = document.getElementById("nav_links").getElementsByTagName("a");
var JsonArray;


// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
// drag and drop api 예제

// drag and drop 시 서버에 파일 업로드
async function loadInfo() {
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
  create_book();
}

function create_book() {
  var upload = document.getElementById("upload");
  var books = document.createElement("div");
  books.className = "row";
  
  for(var i=0;i<JsonArray.length;i++) {
    console.log(JsonArray[i]);
    var book = document.createElement("div");
    var book_title = document.createElement("div");
    var book_img = document.createElement("img");
    var book_a = document.createElement("a");

    book_a.href = "./readPage.html?filename=" + JsonArray[i].filename;
    book_img.className = "jb-image";
    book_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvwcIfihB3dpbPWS9M-j3qEJkKbw-_Sy4vAIghK9D_67dMjjKCZUMPcOFBmvP2yIabDi0&usqp=CAU";
    book_title.textContent = JsonArray[i].originalname;
    book.className = "jb-wrap";
    book_title.className = "jb-text";

    book_a.appendChild(book_img);
    book.appendChild(book_a);
    book.appendChild(book_title);
    books.appendChild(book);
  }

  while (upload.hasChildNodes()) {   
    upload.removeChild(upload.firstChild);
}
  upload.appendChild(books);
}

function dropHandler(ev) {
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            let formData = new FormData();
            formData.append("file", file);
            var res = fetch('/process/upload', {method: "POST", body: formData});
            loadInfo();
            create_book();
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



loadInfo();