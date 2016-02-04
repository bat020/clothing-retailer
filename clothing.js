function Item(uid, desc, taglist, price, quant) {
  this.uid = uid;
  this.desc = desc;
  this.taglist = taglist;
  this.price = price;
  this.quant = quant;
  this.total = (() => this.price * this.quant);
}

function Items(list) {
  this.list = list;
}

Items.prototype.matches = function (id, minQuant) {
  return this.list.filter(item => item.uid === id && item.quant >= minQuant);
}

Items.prototype.takeOut = function (id) {
  this.matches(id, 1).forEach(item => item.quant--);
}

Items.prototype.putIn = function (newItem) {
  if (newItem === null) return;
  var match = this.matches(newItem.uid, 0);
  match.forEach(item => item.quant++);
  if (match.length === 0) this.list.push(newItem);
}

Items.prototype.getItem = function (id) {
  var match = this.matches(id, 1)
  if (match.length === 0) return null;
  return new Item(id, match[0].desc, match[0].taglist, match[0].price, 1);
}

Items.prototype.stripZeros = function () {
  this.list = this.list.filter(item => item.quant > 0);
}

Items.prototype.rawTotal = function () {
  return this.list.map(item => item.total()).reduce((x, y) => x + y, 0);
}

Items.prototype.allTags = function () {
  return this.list.map(item => item.taglist).reduce((x, y) => x.concat(y), []);
}

Items.prototype.hasTag = function (tagToFind) {
  return this.allTags().findIndex(tag => tag === tagToFind) >= 0;
}

Items.prototype.voucher = function () {
  if (this.rawTotal() >= 7500 && this.hasTag("footwear")) return 1500;
  if (this.rawTotal() >= 5000) return 1000;
  return 500;
}

Items.prototype.netTotal = function () {
  return this.rawTotal() - this.voucher();
}

const item01 = new Item(1, "alpha", [], 100, 0);
const item02 = new Item(2, "bravo", [], 200, 1);
const item03 = new Item(3, "charlie", [], 300, 2);
const item04 = new Item(4, "delta", [], 400, 1);
const shoe = new Item(5, "shoe", ["footwear"], 7500, 1);

const stock = new Items([item01, item02, item03]);
const trolley = new Items([item04]);
