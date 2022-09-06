({
	//Reusable toast notification
    showToast: function(title, message, type) {
        console.log("fire fire")
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
        console.log("busca")
        var action = component.get('c.searchAirportsByKey');
        action.setParams({
            searchText: searchKey
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var ids = response.getReturnValue();
                console.log(ids);
                component.set("v.airportOptions", ids);
            }
        });
        $A.enqueueAction(action);
    },
})