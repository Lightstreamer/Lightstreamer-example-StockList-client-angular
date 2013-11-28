define(["./lsClient","Subscription"], function(lsClient,Subscription) {
  var items = ["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10"];
  var fields = ["stock_name","last_price","time","pct_change","bid_quantity","bid","ask","ask_quantity","min","max","ref_price","open_price"];
  
  var subscription = new Subscription("MERGE",items,fields);
  subscription.setDataAdapter("QUOTE_ADAPTER");
  
  lsClient.subscribe(subscription);
  
  return subscription;
});
