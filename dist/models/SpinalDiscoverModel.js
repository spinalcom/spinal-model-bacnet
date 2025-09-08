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
exports.SpinalDisoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const StateEnum_1 = require("../data/StateEnum");
const uuid_1 = require("uuid");
class SpinalDisoverModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, contextInfo, network, organ) {
        super();
        if (!graph || !contextInfo || !network || !organ)
            return;
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: StateEnum_1.STATES.reseted,
            graph: graph ? new spinal_core_connectorjs_type_1.Pbr(graph) : undefined,
            devices: new spinal_core_connectorjs_type_1.Lst(),
            context: contextInfo || {},
            network: network || {},
            organ: organ,
            creation: Date.now()
        });
    }
    setDiscoveringMode() {
        this.state.set(StateEnum_1.STATES.discovering);
        // setTimeout(() => {
        //    if (this.state.get() === STATES.discovering) this.setTimeoutMode();
        // }, 40000)
    }
    setDiscoveredMode() {
        this.state.set(StateEnum_1.STATES.discovered);
    }
    setResetedMode() {
        this.state.set(StateEnum_1.STATES.reseted);
    }
    setTimeoutMode() {
        this.state.set(StateEnum_1.STATES.timeout);
    }
    setCreatingMode() {
        this.state.set(StateEnum_1.STATES.creating);
    }
    setCreatedMode() {
        this.state.set(StateEnum_1.STATES.created);
    }
    setErrorMode() {
        this.state.set(StateEnum_1.STATES.error);
    }
    getOrgan() {
        return __awaiter(this, void 0, void 0, function* () {
            // use ptr
            return this.organ;
        });
    }
    addToGraph() {
        return this.getOrgan().then((organ) => {
            return organ.addDiscoverModelToGraph(this);
        });
    }
    remove() {
        return this.getOrgan().then((organ) => {
            return organ.removeDiscoverModelFromGraph(this);
        });
    }
}
exports.SpinalDisoverModel = SpinalDisoverModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalDisoverModel]);
exports.default = SpinalDisoverModel;
//# sourceMappingURL=SpinalDiscoverModel.js.map