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
    days = diffDays + 1 // so that if the customer takes the car for one day it still counts as one full day ( because otherwise it would be 0 )

    // These conditions are to test how long the rental is to determine the rebate
    // 10% after 1 day
    // 30% after 4 days 
    // 50 % after 10 days
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
    else   // default case would be if the rental was just for one day
    {
      timeComponent[i] = days * cars[i].pricePerDay;
    }
  
    var km;
    var distanceComponent = [];
    km = rentals[i].distance;
    // Determining the distance
    distanceComponent[i] = km * cars[i].pricePerKm;
    // Here we calculate the final price which is : rental price = time + distance 
    rentals[i].price = timeComponent[i] + distanceComponent[i];

    // Now we'll determine drivy's comission as follows : 
    // insurance is half of the comission 
    // Roadside assistance is 1 euro per day 
    // Drivy takes the rest
    var commission = 0;
    var roadsideAssist = 0;
    commission = rentals[i].price * 0.3;
    rentals[i].commission.insurance = commission / 2;
    rentals[i].commission.assistance = days;
    rentals[i].commission.drivy = commission - (rentals[i].commission.insurance + rentals[i].commission.assistance);

    console.log("comission : ", commission); 
    console.log("roadsideAssist", rentals[i].commission.assistance);
    console.log("insurance : ", rentals[i].commission.insurance);
    console.log("drivy : ", rentals[i].commission.drivy);

    console.log("rental price final :", rentals[i].price);


    // Now we'll determine the deductible 
    // If the driver decides to go with the deductible option he'll pay less in case of an accident but has to pay 4 more euros per day of rental
    // The additional charge goes straight to drivy
    if(rentals[i].options.deductibleReduction)
    {
      rentals[i].price += 4 * days;
      rentals[i].commission.drivy += 4* days;
      commission += 4*days;
      console.log("Price with deductible reduction option : ", rentals[i].price);
      console.log("Drivy with deductible reduction option : ", rentals[i].commission.drivy);
    }



    //	Computing the debit and credit for all the parties involved 
    for(var j =0; j < 5; j++)
    {
    	// The driver pays the rental price ( with the optional deductible reduction )
		if(actors[i].payment[j].who == 'driver')
		{
			actors[i].payment[j].amount = rentals[i].price;
		}

		// The owner gets the rental price minus the commission
    	if(actors[i].payment[j].who == 'owner')
    	{
    		actors[i].payment[j].amount = rentals[i].price - commission;
		}


		if(actors[i].payment[j].who == 'insurance')
		{
			actors[i].payment[j].amount = rentals[i].commission.insurance;
		}

		if(actors[i].payment[j].who =='assistance')
		{
			actors[i].payment[j].amount = rentals[i].commission.assistance;
		}

		if(actors[i].payment[j].who =='drivy')
		{
			actors[i].payment[j].amount = rentals[i].commission.drivy;
		}


	}
	

  }
 
}

//list of actors for payment
//useful from exercise 5
var actors = [
{
  'rentalId': '1-pb-92',
  'payment': [
  {
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, 
  {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, 
  {
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
}, 
{
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
