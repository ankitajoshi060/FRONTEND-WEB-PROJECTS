
let views=document.querySelector(".views").innerText;
console.log(views);
document.querySelector(".views").innerText=abbreviateViews(views);
function abbreviateViews(views) {
    if (views >= 1000000000) {
      const billions = (views / 1000000000).toFixed(1);
      return billions.replace(/\.0$/, '') + 'B';
    } else if (views >= 1000000) {
      const millions = (views / 1000000).toFixed(1);
      return millions.replace(/\.0$/, '') + 'M';
    } else if (views >= 1000) {
      const thousands = (views / 1000).toFixed(1);
      return thousands.replace(/\.0$/, '') + 'K';
    } else {
      return views.toString();
    }
  }
  // Example usage:
//   const viewCount1 = 1500000000;
//   const viewCount2 = 2500000;
//   const viewCount3 = 1200;
  
//   const abbreviatedViews1 = abbreviateViews(viewCount1);
//   const abbreviatedViews2 = abbreviateViews(viewCount2);
//   const abbreviatedViews3 = abbreviateViews(viewCount3);
  
//   console.log(abbreviatedViews1); // Output: "1.5B"
//   console.log(abbreviatedViews2); // Output: "2.5M"
//   console.log(abbreviatedViews3); // Output: "1.2K"
  