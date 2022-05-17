"use strict";
/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalMonitorInfoModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalMonitorInfoModel extends spinal_core_connectorjs_type_1.Model {
    constructor(profil, monit) {
        super();
        this.add_attr({
            id: (0, uuid_1.v4)(),
            profil: new spinal_core_connectorjs_type_1.Pbr(profil),
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