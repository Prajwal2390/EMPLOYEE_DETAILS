/*global QUnit*/

sap.ui.define([
	"employeeapplication/controller/EmployeeData.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EmployeeData Controller");

	QUnit.test("I should test the EmployeeData controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
