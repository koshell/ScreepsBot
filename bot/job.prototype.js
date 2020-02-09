/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('job');
 * mod.thing == 'a thing'; // true
 */

/*
class

class Car {
 constructor(brand) {
   this.carname = brand;
 }
 static hello() {
   return "Hello!!";
 }
}

mycar = new Car("Ford");

//Call 'hello()' on the class Car:
document.getElementById("demo").innerHTML = Car.hello();

//and NOT on the 'mycar' object:
//document.getElementById("demo").innerHTML = mycar.hello();
//this would raise an error.

//////////////////////////////////////////////////////////////////////

class Car {
  constructor(brand) {
	this.carname = brand;
  }
  get cnam() {
	return this.carname;
  }
  set cnam(x) {
	this.carname = x;
  }
}

mycar = new Car("Ford");

document.getElementById("demo").innerHTML = mycar.cnam;

//////////////////////////////////////////////////////////////////////

class Car {
  constructor(brand) {
	this.carname = brand;
  }
  present() {
	return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
	super(brand);
	this.model = mod;
  }
  show() {
	return this.present() + ', it is a ' + this.model;
  }
}

mycar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = mycar.show();

*//////////////////////////////////////////////////////////////////////

class jobPrototype {
	constructor(creepId) {
		this.creep = Game.creeps[creepId];
		this.jobId = Game.creeps[creepId].memory.jobId;
		this.jobTargetAlpha = Game.getObjectById(Game.creeps[creepId].memory.jobTargetAlpha);
		this.jobTargetBeta = Game.getObjectById(Game.creeps[creepId].memory.jobTargetBeta);
		this.jobTargetGamma = Game.getObjectById(Game.creeps[creepId].memory.jobTargetGamma);
		this.jobStatusAlpha = Game.creeps[creepId].memory.jobStatusAlpha;
		this.jobStatusBeta = Game.creeps[creepId].memory.jobStatusBeta;
		this.jobStatusGamma = Game.creeps[creepId].memory.jobStatusGamma;
	}
	quitJob() {
		this.creep.memory.job = null;
		this.creep.memory.jobId = null;
		this.creep.memory.jobTargetAlpha = null ;
		this.creep.memory.jobTargetBeta = null;
		this.creep.memory.jobTargetGamma = null;
		this.creep.memory.jobStatusAlpha = null;
		this.creep.memory.jobStatusBeta = null;
		this.creep.memory.jobStatusGamma = null;
	}

	mineClosest() {
		if (this.creep.getActiveBodyparts(WORK) > 0){
			const target = this.creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
			if (target) {
				if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			} else {
				console.log(creep.name + " could find no valid source.");
			}
		} else {
			console.log(creep.name + " has no WORK body parts, can't mine.");
		}
	}

	mineSpecific(sourceObject) {
		if (this.creep.getActiveBodyparts(WORK) > 0){
			if (sourceObject) {
				if(creep.harvest(sourceObject) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sourceObject);
				}
			} else {
				console.log(creep.name + " is attempting to mine invalid source.");
			}
		} else {
			console.log(creep.name + " has no WORK body parts, can't mine.");
		}
	}



}

module.exports = jobPrototype;
