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
exports.SpinalDisoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const spinal_connector_service_1 = require("spinal-connector-service");
class SpinalDisoverModel extends spinal_connector_service_1.SpinalDiscover {
    constructor(graph, context, organ, network) {
        super(graph, context, organ);
        if (!graph || !context || !network)
            return;
        this.add_attr({
            network
        });
    }
    setDiscoveringState() {
        this.changeState(spinal_connector_service_1.STATES.discovering);
    }
    setDiscoveredState() {
        this.changeState(spinal_connector_service_1.STATES.discovered);
    }
    setInitialState() {
        this.changeState(spinal_connector_service_1.STATES.initial);
    }
    setResetedState() {
        console.warn("depricated method, use setInitialState instead");
        this.setInitialState();
    }
    setTimeoutState() {
        this.changeState(spinal_connector_service_1.STATES.timeout);
    }
    setCreatingState() {
        this.changeState(spinal_connector_service_1.STATES.creating);
    }
    setCreatedState() {
        this.changeState(spinal_connector_service_1.STATES.created);
    }
    setErrorState() {
        this.changeState(spinal_connector_service_1.STATES.error);
    }
}
exports.SpinalDisoverModel = SpinalDisoverModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalDisoverModel]);
exports.default = SpinalDisoverModel;
//# sourceMappingURL=SpinalDiscoverModel.js.map