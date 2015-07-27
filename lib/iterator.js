var Iterator = function Iterator (inputArray){
	//private variable for moving around the array
	//start at the beginning of the iterator
	var pointer = 0;
	
	//If we can iterate further, return true. Otherwise return false
	this.hasNext = function () {
		//check if the pointer is at the end of the array
		return pointer < inputArray.length-1;
	},
	
	//Check if we're at the end of the array, then return the next value or false
	this.next = function () {
		return pointer < inputArray.length-1 ? inputArray[++pointer] : false;
	},
	
	//Return the current iterator value
	this.current = function () {
		return inputArray[pointer];
	},
	
	// Return the current value at the time when tag was invoked
	this.tag = function () {
		//create a variable to hold the current value, slip it inside a closure
		var tagCurrent = inputArray[pointer];
		return function () {
			return tagCurrent;
		}
	},
	
	 //Reverse the array, but keep the iterator pointing at the same value
	this.reverse = function () {
		//this is destructive to the original array. I'm assuming we want that from the function description.
		//If that was a problem, we could make a new reverseArray instead and return that
		inputArray.reverse();
		pointer = inputArray.length - 1 - pointer;
		
		//this also has a problem where returning the same value means that if you reverse a newly-made iterator, you are at the end and cannot go back. This could be fixed with a prev() function. That wasn't part of the challenge so I left it off, but it's something to keep in mind for the future
	}
};