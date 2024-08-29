sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
    
],
function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("employeeapplication.controller.pnl", {
        onInit: function () {
        
           var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
           oRouter.getRoute("detail").attachMatched(this._onload,this);

           
          
             var  oModel = new ODataModel("/sap/opu/odata/sap/ZUI_C_PNL");
               this.getView().setModel(oModel);
           
   
           
        },
    //     onAvatarPress: function(oEvent) {
    //         console.log("this.getView():", this.getView());
    // var oFileUploader = this.getView().byId("fileUploader");
    // console.log("oFileUploader:", oFileUploader);
    // var oFiles = oFileUploader.getFiles();
    //         if (oFiles && oFiles.length > 0) {
    //             var oFile = oFiles[0];
    //             var oImageEditor = this.getView().byId("imageId");
    //             if (!oFile) {
    //                 return;
    //             }
    //             this.getView().getModel().setProperty("/blocked", true);
    //             oImageEditor.setSrc(oFile);
    //         }
    //     },
                       
        
        onDataReceived: function(oData) {
			if (oData && oData.Img) {
				var sBase64Image = oData.Img;

				var sImagesrc = "data:image/png;base64," + sBase64Image;
				this.getView().byId("imageId").setSrc(sImagesrc);
			}
		},

        _onload:function(oEvent){
            var oArgs, oView ;
            oArgs=oEvent.getParameter("arguments");
            oView=this.getView();
            var oPersonalDetailsView = [oView.byId("personalDetailsId"), oView.byId("_IDGenObjectPageHeader1") , oView.byId("_IDGenLightBoxItem1")];
            var oOfficeDetailsView = [oView.byId("officeDetailsId"), oView.byId("_IDGenText2")];
            var oprojectDetailsView = oView.byId("projectDetailsId");
            var ofinanceDetailsView = oView.byId("financeDetailsId");
            
             
            var oModel = this.getView().getModel(); // Get the existing model
           
            var oLightBoxItem = this.getView().byId("_IDGenLightBoxItem1");
            var sImageSrc = oLightBoxItem.getImageSrc();
            var oImageEditor = this.getView().byId("imageId");
            oImageEditor.setSrc(sImageSrc);
            this.onLightBoxPress();
           
          


            oModel.read("/z_pnl_m('" + oArgs.Empid + "')", {
				success: this.onDataReceived.bind(this),
				error: function(oError) {
					console.log(oError);
				}
			});
            // oModel.update("/z_pnl_m('" + oArgs.Empid + "')", oData, {
            //     success: function() { /* do something */ },
            //     error: function(oError) { /* do something */ }
            //   });

            
            oPersonalDetailsView.forEach(function(view) {
                view.bindElement({
                    path: "/z_pnl_m('" + oArgs.Empid + "')",
                    event: {
                        dataRequester: function() {
                            oView.setBusy(true);
                        },
                        dataReceived: function() {
                            oView.setBusy(false);
                        }
                    }
                });
            });
            
            oOfficeDetailsView.forEach(function(view) {
                view.bindElement({
                    path: "/z_office_M('" + oArgs.Empid + "')",
                    event: {
                        dataRequester: function() {
                            oView.setBusy(true);
                        },
                        dataReceived: function() {
                            oView.setBusy(false);
                        }
                    }
                });
            });
            oprojectDetailsView.bindElement({
                path: "/z_project_M('" + oArgs.Empid + "')",
                event: {
                    dataRequester: function() {
                        oView.setBusy(true);
                    },
                    dataReceived: function() {
                        oView.setBusy(false);
                    },
                },
            });
            ofinanceDetailsView.bindElement({
                path: "/z_finace_m('" + oArgs.Empid + "')",
                event: {
                    dataRequester: function() {
                        oView.setBusy(true);
                    },
                    dataReceived: function() {
                        oView.setBusy(false);
                    },
                },
            });

           
            oInput.setVisible(false);
            oText.setVisible(true);
            
        },
        onavbutton_press:function(oEvent){
            var oRouter= sap.ui.core.uicomponent.getRouterFor(this);
            oRouter.navTo("Home"); 

        },

        onLightBoxPress: function (oEvent) {
            var oLightBox = this.getView().byId("_IDGenLightBox1");
            oLightBox.open();
        
        },
        onEdit: function() {
            var oModel = this.getView().getModel();
            var bEditMode = oModel.getProperty("/editMode");
            oModel.setProperty("/editMode", !bEditMode);

            // Enable editing for your fields
            var oPersonalDetailsView = this.byId("_IDGenSimpleForm1");
            var oOfficeDetailsView = this.byId("_IDGenSimpleForm11");
            var ofinanceDetailsView = this.byId("_IDGenSimpleForm131");
            var oprojectDetailsView = this.byId("_IDGenSimpleForm121");
            
            this.enableFormFields(oPersonalDetailsView, true);
            this.enableFormFields(oOfficeDetailsView, true);
            this.enableFormFields(ofinanceDetailsView, true);
            this.enableFormFields(oprojectDetailsView, true);

            // Show the update button
            var oSaveButton = this.byId("Update");
            oSaveButton.setVisible(true);
            // oText.setVisible(false);
            // oInput.setVisible(true);


            // Hide the edit button
            var oEditButton = this.byId("Edit");
             oEditButton.setVisible(false);
            // oText.setVisible(false);
            // oInput.setVisible(true);
            // oInput.setEnabled(true);
            // oText.setEnabled(false);
            var oTextControls = this.getView().byId("_IDGenSimpleForm1").getControls();
            var oInputControls = this.getView().byId("_IDGenSimpleForm1").getControls();
            
            oTextControls.forEach(function(control) {
              if (control instanceof sap.m.Text) {
                control.setVisible(false);
              } else if (control instanceof sap.m.Input) {
                control.setVisible(true);
                control.setEnabled(true);
              }
            });
          


        
        },
        enableFormFields: function(oForm, bEnabled) {
            var aFormFields = oForm.getContent();
            for (var i = 0; i < aFormFields.length; i++) {
                var oFormField = aFormFields[i];
                if (oFormField.isA("sap.m.Input")) {
                    oFormField.setEnabled(bEnabled);
                }
            }
        },
        Onupdate: function() {
            var oModel = this.getView().getModel(); // Assuming you've set the model in the view
            var data = {
              Empid: this.byId("_IDGenInput").getValue(),
              Ename: this.byId("_IDGenText112").getValue(),
              FName: this.byId("_IDGenText113").getValue(),
              Country: this.byId("_IDGenText114").getValue(),
              State: this.byId("_IDGenText15").getValue(),
              MNo: this.byId("_IDGenText16").getValue()
            };
            
            if (data.Empid && data.Ename && data.FName) {
             
            oModel.update("/z_pnl_m(Empid='" + data.Empid + "')", data, {
                   method: "PATCH",
                       delta: true,
                    //  bRefresh: true,
                  success: function(data) {
                   console.log("Update successful");
                     },
                      error: function(error) {
                    console.error("Update failed:", error.message, error.statusCode);
    }
                });
  
            } else {
              console.log("data not loaded");
            }
            
            //   oText.setVisible(true);
            //   oInput.setVisible(false);
            //   oInput.setEnabled(false);
            //   oText.setEnabled(true);

            var oTextControls = this.getView().byId("_IDGenSimpleForm1").getControls();
             var oInputControls = this.getView().byId("_IDGenSimpleForm1").getControls();
  
  oTextControls.forEach(function(control) {
    if (control instanceof sap.m.Text) {
      control.setVisible(true);
    } else if (control instanceof sap.m.Input) {
      control.setVisible(false);
      control.setEnabled(false);
    }
  });


        
        }
        
        
        
                
        
        
        
        

       
	});
});
