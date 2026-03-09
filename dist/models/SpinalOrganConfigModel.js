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
exports.SpinalOrganConfigModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const constants_1 = require("../data/constants");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalOrganConfigModel extends spinal_connector_service_1.SpinalOrganModel {
    constructor(name, type = constants_1.BACNET_ORGAN_TYPE) {
        super(name, type);
        if (!name)
            return;
        this.add_attr({
            allBacnetValues: new spinal_connector_service_1.ModelsInfo()
        });
    }
    addBacnetValuesModelToGraph(allBacnetValues) {
        if (!this.allBacnetValues)
            this.add_attr({ allBacnetValues: new spinal_connector_service_1.ModelsInfo() });
        return this.allBacnetValues.addModel(allBacnetValues);
    }
    removeBacnetValuesModelFromGraph(bacnetValuesModel) {
        if (this.allBacnetValues)
            return this.allBacnetValues.removeModel(bacnetValuesModel);
        return Promise.resolve(false);
    }
    getBacnetValuesModelFromGraph() {
        if (!this.allBacnetValues)
            return Promise.resolve(undefined);
        return this.allBacnetValues.getList();
    }
}
exports.SpinalOrganConfigModel = SpinalOrganConfigModel;
SpinalOrganConfigModel.TYPE = constants_1.BACNET_ORGAN_TYPE;
SpinalOrganConfigModel.CONTEXT_TO_ORGAN_RELATION = "hasBmsNetworkOrgan";
//@ts-ignore
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOrganConfigModel]);
exports.default = SpinalOrganConfigModel;
//# sourceMappingURL=SpinalOrganConfigModel.js.map