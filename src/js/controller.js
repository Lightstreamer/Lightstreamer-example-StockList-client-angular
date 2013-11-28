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
        var itemPos = info.getItemPos();
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