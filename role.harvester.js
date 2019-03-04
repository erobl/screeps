require("prototype.creep")();
var roleBuilder = require("role.builder")

module.exports = {
    run: function(creep) {
        creep.switchState();

        creep.work(function(creep) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) =>  (s.structureType == STRUCTURE_SPAWN     ||
                                 s.structureType == STRUCTURE_EXTENSION ||
                                 s.structureType == STRUCTURE_TOWER)    &&
                                 s.energy < s.energyCapacity
            });

            if(structure != undefined) {
                if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                roleBuilder.run(creep)
            }
        })
    }
}