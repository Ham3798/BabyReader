const nav_links_ChildNodes = document.getElementById("nav_links").getElementsByTagName("a");


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