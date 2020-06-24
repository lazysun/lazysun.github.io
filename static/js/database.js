function getAllData() {
  function createImageItem(url, title, desc, tags, width, height) {
    let item = {};
    item.type = 'image';
    item.imageUrl = url;
    item.title = title;
    item.description = desc;
    item.tags = tags;
    item.dimension = {};
    item.dimension.width = width;
    item.dimension.height = height;
    return item;
  }
  // photos are from https://freerangestock.com/
  var items = [];
  items[0] = createImageItem("https://i.imgur.com/FY6a4Yv.jpg",
      "Mount Rushmore",
      "Mount Rushmore with the faces of George Washington, Theodore Roosevelt, Thomas Jefferson, and Abraham Lincoln",
      ["US Presidents", "George Washington", "Theodore Roosevelt",
        "Thomas Jefferson", "Abraham Lincoln"], 2800, 1860);

  items[1] = createImageItem("https://imgur.com/XusJFMr.jpg",
      "Great Pyramid of Giza",
      "Camel sitting in front of Great Pyramid of Giza in Egypt",
      ["Great Pyramid of Giza", "Giza", "Egypt"], 1995, 3000);
  return items;
}