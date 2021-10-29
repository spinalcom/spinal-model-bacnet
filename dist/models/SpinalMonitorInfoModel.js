"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalMonitorInfoModel extends spinal_core_connectorjs_type_1.Model {
    constructor(profil, monit) {
        super();
        this.add_attr({
            id: uuid_1.v4(),
            profil: new spinal_core_connectorjs_type_1.Ptr(profil),
            data: monit
        });
    }
    getMonitoringData() {
        return this.data.get();
    }
}
exports.SpinalMonitorInfoModel = SpinalMonitorInfoModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalMonitorInfoModel]);
exports.default = SpinalMonitorInfoModel;
//# sourceMappingURL=SpinalMonitorInfoModel.js.map