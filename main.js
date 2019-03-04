var roleHarvester = require("role.harvester")
var roleUpgrader = require("role.upgrader")
var roleBuilder = require("role.builder")
var roleRepairer = require("role.repairer")
var spawner = require("spawner")

var roles = {
    "harvester": roleHarvester,
    "upgrader": roleUpgrader,
    "builder": roleBuilder,
    "repairer": roleRepairer
};

module.exports.loop = function() {
    spawner.run(Game.spawns["Spawn1"])
    
        var towers = Game.rooms["W1N4"].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        for (let tower of towers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target != undefined) {
                tower.attack(target);
            }
        }

    for(var i in Game.creeps) {
        var creep = Game.creeps[i]
        roles[creep.memory.role].run(creep)
    }
}

function init() {
    Game.spawns["Spawn1"].memory.spawnQueue = [];
}