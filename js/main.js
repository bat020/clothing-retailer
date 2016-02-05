// initialise the application

$(function () {
  var stock = buildStock(stockData);
  var trolley = new Items([]);
  registerHelpers();
  generateHTML(stock, trolley);
});

function buildStock(data) {
  var itemList = data.map(hash =>
    new Item(hash.uid, hash.desc, hash.taglist, hash.price, hash.quant)
  );
  return new Items(itemList);
}

function registerHelpers () {
  Handlebars.registerHelper('inPounds', pence => (pence / 100).toFixed(2));
  Handlebars.registerHelper('justPounds', pence => (pence / 100).toFixed(0));
  Handlebars.registerHelper('inStock', q => q > 0 ? q + ' in stock' : 'out of stock');
  Handlebars.registerHelper('total', (p, q) => (p * q / 100).toFixed(2));
  Handlebars.registerHelper('hash', tags => tags.map(tag => '#' + tag).join(' '));
}

// generate HTML from templates

function generateHTML(stock, trolley) {
  generateStock(stock);
  generateMessage(trolley);
  generateTrolley(trolley);
  addStockListeners(stock, trolley);
  addTrolleyListeners(stock, trolley);
}

function generateStock(stock) {
  var stockScript = $("#stock-template").html();
  var stockTemplate = Handlebars.compile(stockScript);
  $('.stock-list').find('li').remove();
  $('.stock-list').append(stockTemplate(stock.list));
}

function generateMessage(trolley) {
  var messageScript = $("#message-template").html();
  var messageTemplate = Handlebars.compile(messageScript);
  var context = {
    empty: trolley.rawTotal() === 0,
    raw: trolley.rawTotal(),
    voucher: trolley.voucher(),
    net: trolley.netTotal()
  };
  $('.trolley-message').html(messageTemplate(context));
}

function generateTrolley(trolley) {
  var trolleyScript = $("#trolley-template").html();
  var trolleyTemplate = Handlebars.compile(trolleyScript);
  $('.trolley-list').find('li').remove();
  $('.trolley-list').append(trolleyTemplate(trolley.list));
}

// add listeners to buttons and links

function addStockListeners(stock, trolley) {
  $('.stock-list').find('.buy-button').click(function () {
    var id = $(this).data('index');
    trolley.putIn(stock.getItem(id));
    stock.takeOut(id);
    generateHTML(stock, trolley);
  });
}

function addTrolleyListeners(stock, trolley) {
  $('.trolley-list').find('.remove-link').click(function () {
    var id = $(this).data('index');
    stock.putIn(trolley.getItem(id));
    trolley.takeOut(id);
    trolley.stripZeros();
    generateHTML(stock, trolley);
  });
}
