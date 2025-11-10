const items = document.querySelectorAll<HTMLElement>(".navItem");
const mainImage = document.querySelector<HTMLElement>(".mainImage");

type ColorId = "red" | "blue" | "green";

const colorMap: Record<ColorId, string> = {
  red: "red",
  blue: "blue",
  green: "green"
};

items.forEach((item: HTMLElement) => {
  item.addEventListener("click", function(this: HTMLElement): void {
    console.log(this);
    
    // Remove active class from all items
    items.forEach((navItem: HTMLElement) => {
      navItem.classList.remove("active");
    });
    
    // Add active class to clicked item
    this.classList.add("active");
    
    // Update background color
    const thisID = this.id as ColorId;
    if (mainImage && thisID in colorMap) {
      mainImage.style.backgroundColor = colorMap[thisID];
    }
  });
});
