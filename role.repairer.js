require("prototype.creep")();
var roleBuilder = require("role.builder")

module.exports = {
    run: function(creep) {
        creep.switchState();

        creep.work(function(creep){
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            if(structure != undefined) {
                if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure)
                }
            } else {
                roleBuilder.run(creep)
            }
        });

    }

};