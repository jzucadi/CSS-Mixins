var item = document.querySelectorAll(".navItem");
var mainImage = document.querySelectorAll(".mainImage")[0];


for (i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function() {
    console.log(this);
    item[0].classList.remove('active');
    item[1].classList.remove('active');
    item[2].classList.remove('active')
    var thisID = this.id;
    this.classList.add("active");
    if (thisID === "red") {
      mainImage.style.backgroundColor = "red";
    } else if (thisID === "blue") {
      mainImage.style.backgroundColor = "blue";
    } else {
      mainImage.style.backgroundColor = "green";
    }
  });
}
