# Clothing Retailer

A single page application coded in **JavaScript** with a bit of help from the
**jQuery** and **Handlebars** libraries. Open `index.html` in your browser to
run it, or check out the live version at [bat020.github.io/clothing-retailer/](http://bat020.github.io/clothing-retailer/)

### What does it do?

It displays products for sale and allows the user to add them to or remove them
from a shopping cart. There are stock limits on the availability of each item,
plus various vouchers for purchases that include footwear or are above a certain
amount.

### How does it work?

The code is in three JavaScript files: `clothing.js`, `data.js` and `main.js`

* `clothing.js` contains all the business logic. It defines two prototypes,
  `Item` and `Items`, that represent a quantities of items for sale.

  Both the shop's stock and the user's cart are instances of `Items`. Its
  methods include `takeOut` to remove an item and `putIn` to add one. They do
  nothing if the item to be transferred is out of stock. Other methods such
  as `rawTotal` and `voucher` deal with rudimentary financial calculations.

* `data.js` defines a JSON object `stockData` that is used to build the initial
  stock. In a production system this would be read from a database or an API.

* `main.js` deals with input/output. On loading the application reads in stock
  data and calls the `generateHTML`. This populates the web page and attaches
  listeners that call the appropriate methods in `clothing.js` before passing
  control back to `generateHTML`.

  The application state is stored in two instances of `Items`, `stock` and
  `trolley`, that are passed from function to function.

### What else is there?

There's a simple CSS stylesheet `style.css`. The stock list is displayed in
'inline block' format, so it looks reasonable on different sized screens. But
it's not a fully responsive design.

I prototyped and tested the basic business logic for the application by writing
a few functions in Haskell. If you're interested you can take a look at the
Haskell version on `misc/clothing.hs` – it plays no part in the finished app,
however.

### Any questions?

Contact me, Anindya Bhattacharyya, on [bat020@gmail.com](bat020@gmail.com)
