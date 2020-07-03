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
        inputButton: '.add--button',
        incomeList: '.income--list',
        expensesList: '.expenses--list'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                desc: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addItemUI: function (item, type) {
            var html, listDOM, newHtml;

            html = '<div class="item"><div class="item--description">%desc%</div><div class="item--right"><div class="item--value">%value%</div><div class="item--delete"><button class="delete--button"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            if (type === 'inc') {
                listDOM = document.querySelector(DOMstrings.incomeList);
            } else if (type === 'exp') {
                listDOM = document.querySelector(DOMstrings.expensesList);
            }

            newHtml = html.replace('%desc%', item.description);
            newHtml = newHtml.replace('%value%', item.value);
            listDOM.insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();






//CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAdditem = function () {

        //Get the input data
        var input = UIController.getInput();

        //No field should be empty
        if (input.desc != "" && !isNaN(input.value)) {
            //Add item to Budget Controller
            var newItem = budgetController.addItem(input.type, input.desc, input.value);
            //Add the item to UI
            UIController.addItemUI(newItem, input.type);
            //Calculate the Budget

            //Display the Budget to UI
        }
    };

    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAdditem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAdditem();
            }
        });

    };

    return {
        init: function () {
            console.log('Application has started');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();
