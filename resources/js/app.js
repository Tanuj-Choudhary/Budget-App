//MODEL
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, desc, val) {
            var newItem;

            //Get length of exp or inc array
            var length = data.allItems[type].length;
            var ID;


            //Retrieve the ID of last element and add 1 to create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            //adding according to type of data
            data.allItems[type].push(newItem);

            return newItem;
        }
    };

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

    };

    var ctrlAdditem = function () {

        //Get the input data
        var input = UIController.getInput();
        //Add item to Budget Controller
        var newItem = budgetController.addItem(input.type, input.desc, input.value);
        //Add the item to UI

        //Calculate the Budget

        //Display the Budget to UI
    };

    return {
        init: function () {
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();
