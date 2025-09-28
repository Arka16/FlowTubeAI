// Change background color
document.body.style.backgroundColor = "pink";

// Example: Add a banner at the top
const banner = document.createElement("div");
banner.innerText = "🌟 YouTube Styler Extension Active!";
banner.style.position = "fixed";
banner.style.top = "0";
banner.style.left = "0";
banner.style.width = "100%";
banner.style.background = "yellow";
banner.style.color = "black";
banner.style.fontSize = "20px";
banner.style.textAlign = "center";
banner.style.zIndex = "9999";
banner.style.padding = "10px";

document.body.prepend(banner);
