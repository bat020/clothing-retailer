// business logic coded as methods of Items object

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

// basic list manipulation: takeOut, putIn, getItem

Items.prototype.takeOut = function (id) {
  this._matches(id, 1).forEach(item => item.quant--);
}

Items.prototype.putIn = function (newItem) {
  if (newItem === null) return;
  var match = this._matches(newItem.uid, 0);
  match.forEach(item => item.quant++);
  if (match.length === 0) this.list.push(newItem);
}

Items.prototype.getItem = function (id) {
  var match = this._matches(id, 1)
  if (match.length === 0) return null;
  return new Item(id, match[0].desc, match[0].taglist, match[0].price, 1);
}

Items.prototype._matches = function (id, minQuant) {
  return this.list.filter(item => item.uid === id && item.quant >= minQuant);
}

// remove 0 quantity items from a list

Items.prototype.stripZeros = function () {
  this.list = this.list.filter(item => item.quant > 0);
}

// money methods: rawTotal, voucher, netTotal

Items.prototype.rawTotal = function () {
  return this.list.map(item => item.total()).reduce((x, y) => x + y, 0);
}

Items.prototype.voucher = function () {
  if (this.rawTotal() >= 7500 && this._hasTag("footwear")) return 1500;
  if (this.rawTotal() >= 5000) return 1000;
  return 500;
}

Items.prototype.netTotal = function () {
  return this.rawTotal() - this.voucher();
}

Items.prototype._hasTag = function (tagToFind) {
  return this._allTags().findIndex(tag => tag === tagToFind) >= 0;
}

Items.prototype._allTags = function () {
  return this.list.map(item => item.taglist).reduce((x, y) => x.concat(y), []);
}
