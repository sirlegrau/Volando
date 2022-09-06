({
	doInit : function(component, event, helper) {
		console.log("init");
      	helper.searchByKey(component, "");
	},
    
    originOnFocus : function (component,event,helper){
        
        component.find('origin-search').set('v.value', "")
        helper.searchByKey(component,"");
        component.set("v.showOrigin", true);

    },
    originOnFocusOut : function (component){
        console.log("originFOCUS")
        component.set("v.showOrigin", false);
        component.find('origin-search').set('v.value', component.get("v.tempOrigin"))
        
    },
    onOriginSelect : function (component, event){
        component.find('origin-search').set('v.value', event.currentTarget.dataset.value)
        component.set("v.selectedOrigin", event.currentTarget.dataset.id)
        component.set("v.tempOrigin", event.currentTarget.dataset.value)
     
    },
     searchOrigin: function (component, event, helper) {
         helper.searchByKey(component,component.find('origin-search').get('v.value'))
    },
        destinationOnFocus : function (component,event,helper){
            component.find('destination-search').set('v.value', "")
            helper.searchByKey(component, "");
        	component.set("v.showDestination", true);
    },
    destinationOnFocusOut : function (component){
        
        component.set("v.showDestination", false);
        component.find('destination-search').set('v.value', component.get("v.tempDestination"))
        
    },
    onDestinationSelect : function (component, event){
        component.find('destination-search').set('v.value', event.currentTarget.dataset.value)
        component.set("v.selectedDestination", event.currentTarget.dataset.id)
        component.set("v.tempDestination", event.currentTarget.dataset.value)
     
    },
     searchDestination: function (component,event,helper) {
      	helper.searchByKey(component,component.find('destination-search').get('v.value'));
    },
    //Call by aura:waiting event  
    handleShowSpinner: function(component, event, helper) {
        component.set("v.isSpinner", true); 
    },
     
    //Call by aura:doneWaiting event 
    handleHideSpinner : function(component,event,helper){
        component.set("v.isSpinner", false);
    },
    bookHandler : function(component,event,helper){
        let origin = component.get("v.selectedOrigin");
        let destination = component.get("v.selectedDestination");
        console.log('click!')
        console.log(component.get("v.selectedOrigin"))
        console.log(component.get("v.selectedDestination"))
        if(origin.length === 0 || destination.length == 0 ){
            helper.showToast("Missing Information", "Please select an airport before booking your flight", "warning");
	        }
        else if(origin === destination){
            helper.showToast("Invalid Flight", "Please select a diferent Origin or Destination", "warning")
        }
            else{
                var action = component.get("c.createFlight");
                action.setParams({
            	origin : origin,
           		 dest : destination
       				 });
                action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === 'SUCCESS') {
            helper.showToast("Success!", "Flight successfully booked", "success");
          var res = response.getReturnValue();
            
          component.set("v.distance", res);
          component.set("v.flightDetails", true);
        }
      });

      $A.enqueueAction(action);
            }

    },

    returnButton : function(component){
        component.set("v.distance" , "");
        component.set("v.flightDetails", false);
        component.set("v.selectedOrigin", "")
        component.set("v.tempOrigin", "")
        component.set("v.selectedDestination","")
        component.set("v.tempDestination", "")
        helper.searchByKey(component, "");
        
    }
})