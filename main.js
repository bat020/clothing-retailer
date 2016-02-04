$(function () {

  Handlebars.registerHelper('inPounds', pence => (pence / 100).toFixed(2));
  Handlebars.registerHelper('hash', tags => tags.map(tag => '#' + tag).join(' '));

  var stockScript = $("#stock-template").html();
  var stockTemplate = Handlebars.compile(stockScript);
  $('.stock-list').append(stockTemplate(stock.list));

});
