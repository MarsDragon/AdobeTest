var testCase = buster.testCase("Iterator tests", {
	//testing an empty array
	"empty array": {
		setUp: function(){
			this.inputArray = [];
			this.iter = new Iterator(this.inputArray);
		},
		
		"hasNext should return false in an empty array": function () {
			buster.assert.isFalse(this.iter.hasNext());
		},
	
		"next should return false in an empty array": function () {
			buster.assert.isFalse(this.iter.next());
		},
	
		"current should return undefined with an empty array": function () {
			buster.refute.defined(this.iter.current());
		},
		
		"tag should return undefined": function () {
			this.tag = this.iter.tag();
			buster.refute.defined(this.tag());
		},
		
		"current should still be undefined after a reverse": function () {
			this.iter.reverse();
			buster.refute.defined(this.iter.current());
		},
	},
	
	//array of empty elements
	"array of empty elements":{
		setUp: function(){
			this.inputArray = [ , , , ,];
			this.iter = new Iterator(this.inputArray);
		},
		
		"hasNext should return true if there is a next, even if next is empty": function () {
			buster.assert.isTrue(this.iter.hasNext());
		},
		
		"hasNext should return false if there is no next": function () {
			for(var i=0;i<4;i++){
				this.iter.next();
			}
			buster.assert.isFalse(this.iter.hasNext());
		},
		
		"next should return undefined": function () {
			buster.refute.defined(this.iter.next());
		},
		
		"current should return undefined": function () {
			buster.refute.defined(this.iter.current());
		},
		
		"tag should return undefined": function () {
			this.tag = this.iter.tag();
			buster.refute.defined(this.tag());
		},
		
		"current should still be undefined after a reverse": function () {
			this.iter.reverse();
			buster.refute.defined(this.iter.current());
		},
	},	
	
	//single element
	"one element array": {
		setUp: function(){
			this.inputArray = [1];
			this.iter = new Iterator(this.inputArray);
		},
	
		"hasNext should return false in a single element array": function () {
			buster.assert.isFalse(this.iter.hasNext());
		},
		
		"next should return false in a single element array": function () {
			buster.assert.isFalse(this.iter.next());
		},
		
		"current should return the single value": function () {
			buster.assert.equals(1,this.iter.current());
		},
		
		"tag should return the single value" : function () {
			this.tag = this.iter.tag();
			buster.assert.equals(1,this.tag());
		},
		
		"reverse": {
			setUp: function () {
				this.iter.reverse();
			},
			
			"hasNext should return false in a single element array after reversal": function () {
				buster.assert.isFalse(this.iter.hasNext());
			},
		
			"next should return false in a single element array after reversal": function () {
				buster.assert.isFalse(this.iter.next());
			},
			
			"current should return the single value after reversal": function () {
				buster.assert.equals(1,this.iter.current());
			}
		}
	},
	
	"numeric input": {
		setUp: function(){
			this.inputArray = [1,2,3,4,5,6];
			this.iter = new Iterator(this.inputArray);
		},
	
		"hasNext should return true if there is a next": function () {
			buster.assert.isTrue(this.iter.hasNext());
		},
	
		"hasNext should return false if there is no next": function () {
			for(var i=0;i<6;i++){
				this.iter.next();
			}
			buster.assert.isFalse(this.iter.hasNext());
		},
	
		"next should return the next value": function () {
			//if we're starting at one, the next value is 2
			buster.assert.equals(2,this.iter.next());
		},
	
		"current should return the current value": function () {
			//and the current value is one
			buster.assert.equals(1,this.iter.current());
		},
	
		"tag should return the tagged value after a next()" : function () {
			this.tag = this.iter.tag();
			this.iter.next();
			buster.assert.equals(1,this.tag());
		},
		
		"tag should return the tagged value after a reverse() and next()" : function () {
			this.tag = this.iter.tag();
			this.iter.reverse();
			this.iter.next();
			buster.assert.equals(1,this.tag());
		},
	
		"reverse": {
			setUp: function () {
				this.iter.reverse();
			},
			
			"reverse should retain the same current value as before": function () {
				//if we start at one, then it should still be one
				buster.assert.equals(1,this.iter.current());
			},
			
			"if the iterator is reversed from the starting point it will be at the end": function () {
				//if we're at the end as we should be, hasNext() will return false
				buster.assert.isFalse(this.iter.hasNext());
			},
			
		},
		
		"if the iterator is reversed from the ending point it will be at the start": function () {
			//we don't want this reversed from the beginning, so it's outside the normal reversal tests
			//go to the end
			for(var i=0;i<6;i++){
				this.iter.next();
			}
			//THEN reverse
			this.iter.reverse();
			
			//check that there is a next() and it is the expected value
			buster.assert.equals(5,this.iter.next());
		}
		
	},
	
	//the same as numeric input, to make sure nothing fails when we have a mess of different inputs
	"mixed input": {
		setUp: function(){
			this.inputArray = ["foo", 4, ,[1,2],"bar",{bat:1}];
			this.iter = new Iterator(this.inputArray);
		},
	
		"hasNext should return true if there is a next": function () {
			buster.assert.isTrue(this.iter.hasNext());
		},
	
		"hasNext should return false if there is no next": function () {
			for(var i=0;i<6;i++){
				this.iter.next();
			}
			buster.assert.isFalse(this.iter.hasNext());
		},
	
		"next should return the next value": function () {
			buster.assert.equals(4,this.iter.next());
		},
	
		"current should return the current value": function () {
			buster.assert.equals("foo",this.iter.current());
		},
	
		"tag returns the tagged value after a next()" : function () {
			this.tag = this.iter.tag();
			this.iter.next();
			buster.assert.equals("foo",this.tag());
		},
		
		"tag returns the tagged value after a reverse() and next()" : function () {
			this.tag = this.iter.tag();
			this.iter.reverse();
			this.iter.next();
			buster.assert.equals("foo",this.tag());
		},
	
		"reverse": {
			setUp: function () {
				this.iter.reverse();
			},
			
			"reverse should retain the same current value as before": function () {
				buster.assert.equals("foo",this.iter.current());
			},
			
			"if the iterator is reversed from the starting point it will be at the end": function () {
				buster.assert.isFalse(this.iter.hasNext());
			},
		},
			
		"if the iterator is reversed from the ending point it will be at the start": function () {
			for(var i=0;i<6;i++){
				this.iter.next();
			}
				
			this.iter.reverse();
				
			buster.assert.equals("bar",this.iter.next());
		}
		
	}
});