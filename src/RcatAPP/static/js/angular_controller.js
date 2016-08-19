var app = angular.module('myApp', []);
var education_list = [0,'初中','中专','高中',' 大专', '本科', '硕士', '博士', 'MBA', 'EMBA']
var job_type = {'fulltime':'全职', 'parttime':'兼职', 'intern':'实习'}
 app.factory('myFact', function($http){
      var fact = {};
	  fact.get_list = function(param){ 
	  		return $http({ 
				method:'post',
				url:'/admin/api_company_detail',
				data: JSON.stringify(param),
				headers:{'Content-Type':'application/json; charset=utf-8'}
			});
	  }
	  fact.get_job_list = function(param){
	  		return $http({ 
				method:'post',
				url:'/admin/api_job_detail',
				data: JSON.stringify(param),
				headers:{'Content-Type':'application/json; charset=utf-8'}
			});	  	
	  }
	  return fact;
 });
app.controller('myCtrl', function($scope,myFact) {
	$scope.company_sub = function(name){
		myFact.get_list({'id':name}).success(function(res){
			$scope.names = res;
		});
	}
             $scope.job_sub = function(job_id){
		myFact.get_job_list({'id':job_id}).success(function(res){
			var education_id = res[0]['education']
			var job_type_str = res[0]['job_type']
			res[0]['education'] = education_list[education_id]
			res[0]['job_type'] = job_type[job_type_str]
			$scope.names = res;
		});
	}
});