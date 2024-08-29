sap.ui.define([
    "sap/ui/core/mvc/Controller"
   

],
function (Controller) {
    "use strict";

    return Controller.extend("employeeapplication.controller.EmployeeData", {
        onInit: function () {
           
        },
        handle_press:function(oEvent){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            var selectItemempid=oEvent.getSource().getBindingContext().getProperty("Empid");
            oRouter.navTo("detail",{Empid:selectItemempid});
        },
        createpnl:function(oEvent){
            var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("create_personal_details");
        }
    });
});
