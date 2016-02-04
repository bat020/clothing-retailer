$(function () {

  var stockScript = $("#stock-template").html();
  var stockTemplate = Handlebars.compile(stockScript);
  $('.stock-list').append(stockTemplate(stock.list));

});
