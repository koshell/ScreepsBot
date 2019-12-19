/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('job');
 * mod.thing == 'a thing'; // true
 */


/** @param {Creep} creep **/

var jobEnergyMiner = {
	doJob: function (creep){
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
};

module.exports = jobEnergyMiner;
