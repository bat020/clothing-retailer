$(function () {

  var stock = buildStock();
  var trolley = new Items([]);

  generateHTML(stock, trolley);

});

function generateHTML(stock, trolley) {

  Handlebars.registerHelper('inPounds', pence => (pence / 100).toFixed(2));
  Handlebars.registerHelper('inStock', q => q > 0 ? q + ' in stock' : 'out of stock');
  Handlebars.registerHelper('hash', tags => tags.map(tag => '#' + tag).join(' '));

  var stockScript = $("#stock-template").html();
  var stockTemplate = Handlebars.compile(stockScript);
  $('.stock-list').find('li').remove();
  $('.stock-list').append(stockTemplate(stock.list));

  var trolleyScript = $("#trolley-template").html();
  var trolleyTemplate = Handlebars.compile(trolleyScript);
  $('.trolley-list').find('li').remove();
  $('.trolley-list').append(trolleyTemplate(trolley.list));

  $('.stock-list').find('.buy-button').click(function () {
    var id = $(this).data('index');
    trolley.putIn(stock.getItem(id));
    stock.takeOut(id);
    generateHTML(stock, trolley);
  })

}
