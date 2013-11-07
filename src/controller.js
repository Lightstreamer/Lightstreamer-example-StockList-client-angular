function Controller($scope) {
  $scope.items = {
  };
  $scope.status = "DISCONNECTED";

  require(["lsClient","Subscription"], function(lsClient,Subscription) {
    lsClient.addListener({
      onStatusChange: function(newStatus) {
        $scope.status = newStatus;
        $scope.$apply();
      }
    });
    
    var subscription = new Subscription("MERGE",["item1","item2"],["stock_name","last_price"]);
    subscription.setDataAdapter("QUOTE_ADAPTER");
    
    subscription.addListener({
      onItemUpdate: function(info) {
        var itemName = info.getItemName();
        if (!$scope.items[itemName]) {
          $scope.items[itemName] = {};
        }
        info.forEachChangedField(function(fieldName,fieldPos,val) {
          $scope.items[itemName][fieldName] = val;
        });
        
        $scope.$apply();
      }
    });
    
    lsClient.subscribe(subscription);
    
    
    
    
  });
}  