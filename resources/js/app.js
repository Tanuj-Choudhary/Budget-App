//MODEL
var budgetController = (function () {


})();





//VIEW
var UIController = (function () {


})();






//CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAdditem = function () {
    	
        //Get the input data

        //Add item to Budget Controller

        //Add the item to UI

        //Calculate the Budget

        //Display the Budget to UI
    }

    document.querySelector('.add--button').addEventListener('click', ctrlAdditem);

    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAdditem();
        }
    });

})(budgetController, UIController);
