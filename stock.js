function buildStock() {
  var stockList = [
    {
      "uid": 0,
      "desc": "Almond Toe Court Shoes, Patent Black",
      "taglist": ["women", "footwear"],
      "price": 9900,
      "quant": 5
    },
    {
      "uid": 1,
      "desc": "Suede Shoes, Blue",
      "taglist": ["women", "footwear"],
      "price": 4200,
      "quant": 4
    },
    {
      "uid": 2,
      "desc": "Leather Driver Saddle Loafers, Tan",
      "taglist": ["men", "footwear"],
      "price": 3400,
      "quant": 12
    },
    {
      "uid": 3,
      "desc": "Flip Flops, Red",
      "taglist": ["men", "footwear"],
      "price": 1900,
      "quant": 6
    },
    {
      "uid": 4,
      "desc": "Flip Flops, Blue",
      "taglist": ["men", "footwear"],
      "price": 1900,
      "quant": 0
    },
    {
      "uid": 5,
      "desc": "Gold Button Cardigan, Black",
      "taglist": ["women", "casualwear"],
      "price": 16700,
      "quant": 6
    },
    {
      "uid": 6,
      "desc": "Cotton Shorts, Medium Red",
      "taglist": ["women", "casualwear"],
      "price": 3000,
      "quant": 5
    },
    {
      "uid": 7,
      "desc": "Fine Stripe Short Sleeve Shirt, Grey",
      "taglist": ["men", "casualwear"],
      "price": 4999,
      "quant": 9
    },
    {
      "uid": 8,
      "desc": "Fine Stripe Short Sleeve Shirt, Green",
      "taglist": ["men", "casualwear"],
      "price": 3999,
      "quant": 3
    },
    {
      "uid": 9,
      "desc": "Sharkskin Waistcoat, Charcoal",
      "taglist": ["men", "formalwear"],
      "price": 7500,
      "quant": 2
    },
    {
      "uid": 10,
      "desc": "Lightweight Patch Pocket Blazer, Deer",
      "taglist": ["men", "formalwear"],
      "price": 17550,
      "quant": 1
    },
    {
      "uid": 11,
      "desc": "Bird Print Dress, Black",
      "taglist": ["women", "formalwear"],
      "price": 27000,
      "quant": 10
    },
    {
      "uid": 12,
      "desc": "Mid Twist Cut-Out Dress, Pink",
      "taglist": ["women", "formalwear"],
      "price": 54000,
      "quant": 5
    }
  ];
  var itemList = stockList.map(hash =>
    new Item(hash.uid, hash.desc, hash.taglist, hash.price, hash.quant)
  );
  return new Items(itemList);
}
