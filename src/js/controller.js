/*
Copyright 2013 Weswit s.r.l.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// Access by name
function Controller($scope) {
  $scope.items = {};
  
  require(["js/subscription"], function(subscription) {
    
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
  });
}

// Iterate through index
function Controller_index($scope) {
  $scope.items = [];
  
  require(["js/subscription"], function(subscription) {
    
    subscription.addListener({
      onItemUpdate: function(info) {
        var itemPos = info.getItemPos()-1;
        if (!$scope.items[itemPos]) {
          $scope.items[itemPos] = [];
        }
        info.forEachChangedField(function(fieldName,fieldPos,val) {
          $scope.items[itemPos][fieldPos-1] = val;
        });
        
        $scope.$apply();
      }
    });
  });
}  

var app = angular.module('ls_angular', ['ngGrid']);
app.controller('Controller_grid', function($scope) {
  $scope.items =  [];
  $scope.gridOptions = { 
      data: 'items', 
      columnDefs: [
                   {field:'stock_name', displayName:'Name', width:"160px"},
                   {field:'last_price', displayName:'Price'},
                   {field:'time', displayName:'Time'},
                   {field:'pct_change', displayName:'Change'},
                   {field:'bid_quantity', displayName:'Bid Size'},
                   {field:'bid', displayName:'Bid'},
                   {field:'ask', displayName:'Ask'},
                   {field:'ask_quantity', displayName:'Ask Size'},
                   {field:'min', displayName:'Min'},
                   {field:'max', displayName:'Max'},
                   {field:'ref_price', displayName:'Ref.'},
                   {field:'open_price', displayName:'Open'}
                  ],
     
  };
  
  require(["js/subscription"], function(subscription) {
    
    subscription.addListener({
      onItemUpdate: function(info) {
        var itemPos = info.getItemPos()-1;
        
        if (!$scope.items[itemPos]) {
          for (var i=0; i<=itemPos; i++) {//ng-grid does not like empty elements in the array
            if (!$scope.items[i]) {
              $scope.items[i] = {};
            }
          }
        }
        
        info.forEachChangedField(function(fieldName,fieldPos,val) {
          $scope.items[itemPos][fieldName] = val;
        });
        
        $scope.$apply();
      }
    });
  });
});