const nav_links_ChildNodes = document.getElementById("nav_links").getElementsByTagName("a");
var data = localStorage.getItem("data");


// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
// drag and drop api 예제

function create_book(file) {
    var book = document.createElement("div");
    book.textContent = file.name;
    book.id = data.length;
    book.href = "./readPage.html";
    book.className = "m-1 mb-4 bg-light row-lg-2 book";

    document.getElementById("upload").appendChild(book);
}

function dropHandler(ev) {
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            create_book(file);
            data.push(file);
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



for(var i=0;i<nav_links_ChildNodes.length;i++) {
    nav_links_ChildNodes[i].addEventListener("click", move_navs);
}

if(data == null) {
    data = Array();
}
else {
    for(var i=0;i<data.length;i++) {
        data[i];
    }
}