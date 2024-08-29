sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";
  var PersonalDetails = Controller.extend("employeeapplication.SharedBlocks.PersonalDetails", {
      // Ensure that the metadata is correctly defined
      metadata: {
          properties: {},
          aggregations: {},
          events: {}
      },
      // Ensure that the init method is correctly implemented
      init: function () {
          // Initialization code here
      }
  });
  return PersonalDetails;
});
