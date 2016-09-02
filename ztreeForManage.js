'use strict';

/* Directives */


var module = angular.module('spider.directives');
  
module.directive('ztreeForManage', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		scope: {
		    'container': '@'
		},
		controller: function($scope, $element, $attrs, $http, $compile) {
			var zt = null;
			var setting = {
				check: {
					enable: false,
					dblClickExpand: false
				},callback: {
					onClick : onMouseDown
				},
				view: {
					showLine: false
				}
			};
			//获得用户信息
			$.get("/account/getUserinfo", function(result) {
				var data = JSON.parse(result);
				if (data.status == 0) {
					loadMenusTreeLeft(data.data.utype);
				}
			});
			//加载菜单树
			function loadMenusTreeLeft(utype){
				zt = window.$.fn.zTree;
				if(utype == '0'){
					var testList =[
						{ id:1, pId:0, name:"系统设置",
							children: [
                                { "id":11, "name":"修改账户信息","page":"change-user-info","controller":"changeUserInfo"},
                                { "id":12, "name":"用户管理","page":"user-manage","controller":"invitation"},
                                { "id":13, "name":"Spider管理","page":"spider-manage","controller":"spider"},
								{ "id":14, "name":"Robot管理","page":"robot-manage","controller":"robot"},
								{ "id":15, "name":"合并日志任务管理","page":"task-manage","controller":"robot"}
							],open:true}
					];
				}else{
					var testList =[
						{ id:1, pId:0, name:"系统设置",
							children: [
								{ "id":11, "name":"修改账户信息","page":"change-user-info","controller":"changeUserInfo"},
								{ "id":12, "name":"用户管理","page":"user-manage","controller":"invitation"}
							],open:true}
					];
				}
				$.fn.zTree.init($($element), setting, testList);
			}

			//点击菜单项
			function onMouseDown(event, treeId, treeNode) {
				var page = treeNode.page;
				var url = '/js/angular/partials/manage/'+page+'.html';
				var html = '<div ng-controller="'+treeNode.controller+'" ng-include="\''+url+'\'"></div>';
                var template = angular.element(html);
				var mobileDialogElement = $compile(template)($scope);
                $('#'+$scope.container).empty();
				angular.element(document.getElementById($scope.container)).append(mobileDialogElement);
			}
		}
	}
}
]);