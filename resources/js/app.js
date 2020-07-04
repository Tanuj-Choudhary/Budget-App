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
        },
        
        budget:0
    };

    var calculateTotal = function(type) {
    	var sum = 0;
        
    	data.allItems[type].forEach(function(curr) {
            sum = sum + curr.value;     
        });
        
        //storing total
        data.totals[type] = sum;
    }

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
        },

        deleteItem: function(type,ID) {
        	var item;       	
        	data.allItems[type].forEach(function(curr,index) {
        		if(curr.id == ID) {
        			item = data.allItems[type].splice(index,1);
        		}
        	});
        	return item;
        },
        
        calculateBudget: function () {
            //calculate Total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate Budget
            data.budget = data.totals.inc - data.totals.exp;
        },
        
        getBudget: function () {
        	return {
        		budget: data.budget,
        		totalInc: data.totals.inc,
        		totalExp: data.totals.exp
        	};
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
        expensesList: '.expenses--list',
        budget: '.budget--value',
        totalIncome: '.budget--income--value',
        totalExpenses: '.budget--expenses--value',
        budgetList: '.budget-list'
    };

    var formatNumber = function(number,type) {
    	var numSplit,intPart,decimalPart;

    	number = Math.abs(number);

    	//Adding decimal upto 2 places
    	// 1) 1000 -> 1000.00  2) 1000.2345 -> 1000.23    	
    	number = number.toFixed(2); 

    	//splitting number
    	numSplit = number.split('.');
    	intPart = numSplit[0];
    	decimalPart = numSplit[1];

    	//comma seperating the thousands
    	//12300 -> 12,300
    	if(intPart.length > 3) {	
    		intPart = intPart.substr(0,intPart.length-3) + ',' + intPart.substr(intPart.length-3,intPart.length);
    	}

    	//joining int and decimal
    	number = intPart + '.' + decimalPart;

    	// + or - before number
    	number = type == 'inc' ? '+' + number : '-' + number;

    	return number;
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

            
            if (type === 'inc') {
            	html = '<div class="item" id="inc-%id%"><div class="item--description">%desc%</div><div class="item--right"><div class="item--value">%value%</div><div class="item--delete"><button class="delete--button"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                listDOM = document.querySelector(DOMstrings.incomeList);
            } else if (type === 'exp') {
            	html = '<div class="item" id="exp-%id%"><div class="item--description">%desc%</div><div class="item--right"><div class="item--value">%value%</div><div class="item--delete"><button class="delete--button"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                listDOM = document.querySelector(DOMstrings.expensesList);
            }

            newHtml = html.replace('%id%',item.id);
            newHtml = newHtml.replace('%desc%', item.description);
            newHtml = newHtml.replace('%value%', item.value);
            listDOM.insertAdjacentHTML('beforeend', newHtml);
        },

        deleteItemUI: function(type,ID) {
        	var itemID,element;

        	itemID = type + '-' + ID;
        	element = document.getElementById(itemID);	

        	if(type === 'inc') {
        		document.querySelector(DOMstrings.incomeList).removeChild(element);
        	} else if(type === 'exp') {
        		document.querySelector(DOMstrings.expensesList).removeChild(element);
        	}
        },

        clearFields: function () {
            document.querySelector(DOMstrings.inputDescription).value = "";
            document.querySelector(DOMstrings.inputValue).value = "";
        },

        displayBudget:function (obj) {
        	document.querySelector(DOMstrings.budget).textContent = obj.budget;
        	document.querySelector(DOMstrings.totalIncome).textContent = obj.totalInc;
        	document.querySelector(DOMstrings.totalExpenses).textContent = obj.totalExp;
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();






//CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

	var updateBudget = function() {
		var budget;
		//Calculate Budget
		budgetController.calculateBudget();
		//Return Budget
		budget = budgetController.getBudget();
		//Display Budget on UI
		UIController.displayBudget(budget);
	}

    var ctrlAdditem = function () {

        //Get the input data
        var input = UIController.getInput();

        //No field should be empty
        if (input.desc != "" && !isNaN(input.value)) {
            //Add item to Budget Controller
            var newItem = budgetController.addItem(input.type, input.desc, input.value);
            //Add the item to UI
            UIController.addItemUI(newItem, input.type);
            //Clear input fields
            UIController.clearFields();
            //Update Budget
            updateBudget();
        }
    };

    //Using event delegation
    //parent - budgetList
    //child - icon or delete button
    var ctrlDeleteitem = function(event) {
    	var itemID,itemIDSplit,type,ID;
    	//if icon or button is clicked
    	if(event.target.tagName === 'I') {
    		itemID = event.target.closest('.item').id;
    		itemIDSplit = itemID.split('-');

    		type = itemIDSplit[0];
    		ID = itemIDSplit[1];
    		
    		//Delete item from data structure
    		budgetController.deleteItem(type,ID);
    		//Delete item from UI
    		UIController.deleteItemUI(type,ID);
    		//Update Budget and show Budget
    		updateBudget();
    	}
    }

    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAdditem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAdditem();
            }
        });

        document.querySelector(DOM.budgetList).addEventListener('click', ctrlDeleteitem);
    };

    return {
        init: function () {
        	//checking functionality
            console.log('Application has started');

            //setting initial budget (0)
            UIController.displayBudget(budgetController.getBudget());

            //event listeners
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();
