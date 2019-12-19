/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('job');
 * mod.thing == 'a thing'; // true
 */

import jobPrototype from 'job.prototype';

if(this.jobTargetAlpha instanceof ConstructionSite)

class jobEngineer extends jobPrototype {
	doJob() {
		if (this.jobTargetAlpha != null) {
			if (this.jobTargetAlpha instanceof ConstructionSite){
				this.build();
			} else if (this.jobTargetAlpha instanceof Structure) {
				this.repair();
			} else {
				console.log("INVALID TARGET OBJECT FOR CREEP " + Game.creeps[this.id].name + " WITH JOB " + this.jobId);
			}
		} else {
			// completeJob
		}
	}

	repair() {
		switch(this.jobStatusAlpha) {
			case 0:
				// Collect Energy




				if (this.creep.store.getFreeCapacity[RESOURCE_ENERGY] > 0){

				}




				break;
			case 1:
				// code block
				break;
			default:
				// INVALID JOB STATUS
	}


	}

	build() {

	}



		if(this.jobStatusAlpha && .store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}
		if(creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length) {
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		} else {
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
	}



}

//

run: function(creep) { }
 };

 module.exports = roleBuilder;

module.exports = {

};
