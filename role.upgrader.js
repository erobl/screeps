require("prototype.creep")();

module.exports = {
    run: function(creep) {
        creep.switchState()

        creep.work(function(creep) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        })
    }

};