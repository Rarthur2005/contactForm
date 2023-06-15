function onload() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.get('t') == "s") {
    var element = document.getElementById("success")
    element.style.visibility = "inherit";
  } else if (urlParams.get('t') == "e") {
    var element = document.getElementById("success")
    element.style.backgroundColor = "#a80202";
    element.innerHTML = "Internal Error"
    element.style.visibility = "inherit";
  }
}
