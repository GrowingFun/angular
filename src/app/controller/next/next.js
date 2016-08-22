app.controller("next", ["$scope",function($scope) {
        $scope.next = {
            firstName: "next"
        };
        $scope.count = 0;
        $scope.name = "ZhangLitao";
        $scope.showName = function(){
        	$scope.count++;
        	console.log( $scope.name.toLocaleLowerCase() );
        }
    }
]);