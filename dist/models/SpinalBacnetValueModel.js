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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalBacnetValueModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
const constants_1 = require("../data/constants");
class SpinalBacnetValueModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network, node, sensor) {
        super();
        if (!graph || !context || !organ || !network || !node || !sensor)
            return;
        this.add_attr({
            id: (0, uuid_1.v4)(),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            node: new spinal_core_connectorjs_type_1.Pbr(node),
            graph: new spinal_core_connectorjs_type_1.Pbr(graph),
            network: new spinal_core_connectorjs_type_1.Pbr(network),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            state: constants_1.BACNET_VALUES_STATE.wait,
            sensor: sensor,
            progress: 0
        });
    }
    changeState(state) {
        this.state.set(state);
    }
    getGraph() {
        return this.loadPtr(this.graph);
    }
    getOrgan() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.loadPtr(this.organ);
        });
    }
    getContext() {
        return this.loadPtr(this.context);
    }
    getNode() {
        return this.loadPtr(this.node);
    }
    getNetwork() {
        return this.loadPtr(this.network);
    }
    addToGraph() {
        return this.getOrgan().then((organNode) => __awaiter(this, void 0, void 0, function* () {
            const organ = yield organNode.getElement(true);
            return organ.addBacnetValuesModelToGraph(this);
        }));
    }
    removeFromGraph() {
        return this.getOrgan().then((organNode) => __awaiter(this, void 0, void 0, function* () {
            const organ = yield organNode.getElement(true);
            return organ.removeBacnetValuesModelFromGraph(this);
        }));
    }
    getAllItem() {
        const promises = [this.getContext(), this.getNode(), this.getGraph(), this.getNetwork(), this.getOrgan()];
        return Promise.all(promises).then(([context, node, graph, network, organ]) => {
            return { context, node, graph, network, organ };
        });
    }
    loadPtr(ptr) {
        return new Promise((resolve) => ptr.load((res) => resolve(res)));
    }
}
exports.SpinalBacnetValueModel = SpinalBacnetValueModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalBacnetValueModel]);
exports.default = SpinalBacnetValueModel;
//# sourceMappingURL=SpinalBacnetValueModel.js.map