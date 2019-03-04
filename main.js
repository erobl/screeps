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
    spawner.run()

    for(var i in Game.creeps) {
        var creep = Game.creeps[i]
        roles[creep.memory.role].run(creep)
    }
}