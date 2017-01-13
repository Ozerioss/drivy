'use strict';

//list of cars
//useful for ALL exercises
var cars = [
{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, 
{
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, 
{
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [
{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

/*
function timeComponent()
{
  var x,y;
  var i =0;
  for (var key in rentals[0])
  {
    rentals[key].pickupDate
  }
}*/



//console.log("difference of dates", (returnDate2 - pickupDate2)+1);
function makeMoney()
{
  var days;
  var timeComponent = [];
  for(var i=0; i<rentals.length; i++)
  {
    var returnDate2 = new Date(rentals[i].returnDate);
    var pickupDate2 = new Date(rentals[i].pickupDate);
    var timeDiff = Math.abs(returnDate2.getTime() - pickupDate2.getTime());
    var diffDays = Math.ceil(timeDiff /(1000*3600*24));
    days = diffDays + 1
    console.log("days", days);
    if(days>1 && days< 4)
    {
    timeComponent[i] = days * (cars[i].pricePerDay - cars[i].pricePerDay * 0.1);
  }
  else if(days>=4 && days< 11)
    {
    timeComponent[i] = days * (cars[i].pricePerDay - cars[i].pricePerDay * 0.3);
  }
  else if(days > 10)
    {
    timeComponent[i] = days * (cars[i].pricePerDay - cars[i].pricePerDay * 0.5);
  }
  else 
  {
    timeComponent[i] = days * cars[i].pricePerDay;
  }

    console.log("timeComponent", timeComponent[i]);
  }

  var km;
  var distanceComponent = [];
  for(var i=0; i<rentals.length; i++)
  {
    km = rentals[i].distance;
    console.log("km", km);
    distanceComponent[i] = km * cars[i].pricePerKm;
    console.log("distanceComponent", distanceComponent[i]);
  }

var commission = 0;
  for(var i =0; i<rentals.length; i++)
  {
    rentals[i].price = timeComponent[i] + distanceComponent[i];

    commission = rentals[i].price * 0.3;
    rentals[i].commission.insurance = commission / 2;
    console.log("comission : ", commission); 
    console.log("insurance : ", rentals[i].commission.insurance);
    console.log("rental price final :", rentals[i].price);
  }


}



  //console.log("rental price", rentalPrice.join(", "));


//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

// Calling the function that does all the work
makeMoney();

console.log("cars", cars);
console.log("rentals", rentals);
console.log("actors", actors);
console.log("rentalModifications", rentalModifications);
