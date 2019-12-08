var MunkresJS = require("munkres");

// Main Loop
module.exports.loop = function () {
    for (const i in Game.creeps) {
        if (Game.creeps[i].memory.mining == true){
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
}

function checkGameState(){
    console.log("Check game state is incomplete");
}

// START OF JOBS

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

// END OF JOBS
