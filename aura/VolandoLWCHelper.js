({
	//Reusable toast notification
    showToast: function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: title,
            message: message,
            type: type,
            duration: ' 200',

        });
        toastEvent.fire();
    },
    //Reusable aiport query callback
    searchByKey: function(component, searchKey) {
        var action = component.get('c.searchAirportsByKey');
        action.setParams({
            searchText: searchKey
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var ids = response.getReturnValue();
                component.set("v.airportOptions", ids);
            }
        });
        $A.enqueueAction(action);
    },
})
