function pagechange(frompage, topage) {
  var page = document.getElementById("content_" + frompage);
  if (!page) return false;
  page.style.visibility = "hidden";
  page.style.display = "none";

  page = document.getElementById("content_" + topage);
  if (!page) return false;
  page.style.display = "grid";
  page.style.visibility = "visible";

  return true;
}
