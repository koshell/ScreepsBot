var MunkresJS = require("munkres");

// MEMORY ALLOCATIONS

if (!Memory.atWar){
	Memory.atWar = false;
}

// END MEMORY ALLOCATIONS

// FUNCTION DECLARATIONS

function summonCreep(spawner, moveValue, workValue, carryValue, attackValue, rangedAttackValue, healValue, claimValue, toughValue){

	/*
		MOVE
			Cost: 50
				Decreases fatigue by 2 points per tick.

		WORK
			Cost: 100
				Harvests 2 energy units from a source per tick.
	  			Harvests 1 resource unit from a mineral or a deposit per tick.
	  			Builds a structure for 5 energy units per tick.
	  			Repairs a structure for 100 hits per tick consuming 1 energy unit per tick.
	  			Dismantles a structure for 50 hits per tick returning 0.25 energy unit per tick.
	  			Upgrades a controller for 1 energy unit per tick.

	  	CARRY
			Cost: 50
				Can contain up to 50 resource units.

	  	ATTACK
			Cost: 80
				Attacks another creep/structure with 30 hits per tick in a short-ranged attack.

	  	RANGED_ATTACK
			Cost: 150
				Attacks another single creep/structure with 10 hits per tick in a long-range attack up to 3 squares long.
	  			Attacks all hostile creeps/structures within 3 squares range with 1-4-10 hits (depending on the range).

	  	HEAL
			Cost: 250
				Heals self or another creep restoring 12 hits per tick in short range or 4 hits per tick at a distance.

	  	CLAIM
			Cost: 600
				Claims a neutral room controller.
	  			Reserves a neutral room controller for 1 tick per body part.
	  			Attacks a hostile room controller downgrading its timer by 300 ticks per body parts.
	  			Attacks a neutral room controller reservation timer by 1 tick per body parts.
	  			A creep with this body part will have a reduced life time of 600 ticks and cannot be renewed.

	  	TOUGH
			Cost: 10
				No effect, just additional hit points to the creep's body. Can be boosted to resist damage.

		Max of 50 body parts per creep.

		Each creep has a max lifespan of 1500 game ticks.

		Each Spawn has 300 energy units.

		Each Extension has 50 energy units.

		Each body part adds 100 hits to the creep.

		The order in which the parts were specified during the spawning of a creep also has a bearing.
		Under attack, the first parts to take hits are those specified first.
		Full damage to a part leads to complete disabling of it – the creep can no longer perform this function.
	*/

	let body = [];

	for (let step = 0; step < Math.floor(toughValue/10); step++) {
		body.push(TOUGH);
	}

	for (let step = 0; step < Math.floor(claimValue/600); step++) {
		body.push(CLAIM);
	}

	for (let step = 0; step < Math.floor(rangedAttackValue/150); step++) {
		body.push(RANGED_ATTACK);
	}

	for (let step = 0; step < Math.floor(attackValue/80); step++) {
		body.push(ATTACK);
	}

	for (let step = 0; step < Math.floor(carryValue/50); step++) {
		body.push(CARRY);
	}

	for (let step = 0; step < Math.floor(workValue/100); step++) {
		body.push(WORK);
	}

	for (let step = 0; step < Math.floor(healValue/250); step++) {
		body.push(HEAL);
	}

	for (let step = 0; step < Math.floor(moveValue/50); step++) {
		body.push(MOVE);
	}

	Game.spawns[spawner].spawnCreep(body, Game.time, {
		energyStructures: [
			Game.spawns[spawner],
			Game.getObjectById('anExtensionId')
		]
		, memory: {job: 'unemployed'}
	});
}

function checkGameState(){
    console.log("Check game state is incomplete");
}

// JOBS

function energyMiner(creep){
    if (creep.memory.goingToMine) {
        const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        if (target) {
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) < 1) {
            creep.memory.goingToMine = false;
        }
    } else {
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0){

            const energyStructure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(object) {
                    return object.store && (object.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getCapacity(RESOURCE_ENERGY));
                }
            });

            if (energyStructure) {
                if(creep.transfer(energyStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyStructure);
                }
            } else {
				if(creep.room.controller) {
    				if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        				creep.moveTo(creep.room.controller);
    				}
				}

			}

        } else {
            creep.memory.mining = false;
        }
    }
}

function warrior(creep){
    console.log("Warrior is incomplete.");
}

function engineer(creep){


    console.log("Engineer is incomplete.");
}

// END JOBS



// END FUNCTION DECLARATIONS

// MAIN LOOP

module.exports.loop = function () {

// COMMAND LOOP

// END COMMAND LOOP

// SPAWN CREEPS

	summonCreep('Spawn1', 100, 100, 100, 0, 0, 0, 0, 0);

// END SPAWN CREEPS

// JOB LOOP

    for (const i in Game.creeps) {
		if (!Game.creeps[i].spawning) {
			if (Game.creeps[i].memory.mining){
	            energyMiner(Game.creeps[i]);
	        } else {
	            switch(Game.creeps[i].memory.job){
	                case 'warrior':
	                    break;
	                case 'unemployed':
	                    Game.creeps[i].memory.goingToMine = true;
	                    Game.creeps[i].memory.mining = true;
	                    energyMiner(Game.creeps[i]);
	                    break;
	                case 'text':
	                    break;
	                default:
	                    console.log(`Creep ${Game.creeps[i].name} has invalid job ${Game.creeps[i].memory.job}.`);
	            }
	        }
		}
    }	// END JOB LOOP

// MEMORY CLEANUP

    for (let i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

// END MEMORY CLEANUP


}	// END MAIN LOOP

/*

	This is where I keep bits of code I want to have easy reference for,
	or just need somewhere to record.

	-- 'for' loops in Javascript --
	for (let step = 0; step < 5; step++) {
	  // Runs 5 times, with values of step 0 through 4.
	  console.log('Walking east one step');
	}

	Error: This creep doesn't exist yet
	    at data (<isolated-vm>:24497:19)
	    at Object.get [as store] (eval at exports.defineGameObjectProperties (<isolated-vm>:1093:9), <anonymous>:7:62)
	    at energyMiner (main:165:19)
	    at Object.module.exports.loop (main:139:21)
	    at __mainLoop:1:52
	    at __mainLoop:2:3
	    at Object.exports.evalCode (<isolated-vm>:15817:76)
	    at Object.exports.run (<isolated-vm>:17263:24)

*/

/*



const variableIndex = "otherIndex";

const object = {

	index: "value",

	[variableIndex]: "otherValue" // The index will be used from the variable. Can be any type!

};

​

console.log(object.index, object[variableIndex])

​

// Note that the curly brackets on their own can also just be code blocks:

{

	console.log("This is a code block");

}

​

// If you include an index it will become an object:

{

	index: value

} // This is an object

​

// You can also define functions in an object without the colon and you can define indexes and values from a variable:

const myVariable = "abc123";

const testObject = {

	myFunc() {

		// Code

	},

	myVariable

};

​

console.log(testObject.myVariable); // abc123



*/
