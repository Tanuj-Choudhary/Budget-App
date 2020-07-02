//MODEL
var budgetController = (function () {


})();





//VIEW
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add--type',
        inputDescription: '.add--description',
        inputValue: '.add--value',
        inputButton: '.add--button'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                desc: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();






//CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAdditem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAdditem();
            }
        });

    }

    var ctrlAdditem = function () {

        //Get the input data
        var input = UIController.getInput();
        //Add item to Budget Controller

        //Add the item to UI

        //Calculate the Budget

        //Display the Budget to UI
    };

    return {
    	init: function() {
    		setupEventListeners();
    	}
    }

})(budgetController, UIController);

controller.init();