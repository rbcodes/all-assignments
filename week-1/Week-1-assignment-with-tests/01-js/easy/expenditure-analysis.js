/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

// function calculateTotalSpentByCategory(transactions) {
//   var totalSpents = [];
//   transactions.forEach(elementtransaction => {
//       var categoryFound = false;
//       totalSpents.forEach(elementSpent => {
//         if(elementSpent.category == elementtransaction.category){
//           categoryFound = true;
//           elementSpent.totalSpent = elementSpent.totalSpent + elementtransaction.price;
//         }
//       });
//       if(!categoryFound){
//         var elementSpent = {"category" : elementtransaction.category, "totalSpent" : elementtransaction.price}
//         totalSpents.push(elementSpent);
//       }
// });
// return totalSpents;
// }




function calculateTotalSpentByCategory(transactions) {
  var Output = [];
  var accountKeeper = {};

  transactions.forEach(transaction => {
    if(Object.keys(accountKeeper).includes(transaction.category)){
      accountKeeper[transaction.category] = accountKeeper[transaction.category] + transaction.price;
    }
    else{
      console.log("transaction.category 2", transaction.category);
      accountKeeper[transaction.category+""] = transaction.price;
    }
  });

  Object.keys(accountKeeper).forEach(category => {
    Output.push({"category" : category, "totalSpent": accountKeeper[category]} )
  });
     

  return Output;
}



module.exports = calculateTotalSpentByCategory;