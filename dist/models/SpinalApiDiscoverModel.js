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
exports.SpinalApiDiscoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const StateEnum_1 = require("../data/StateEnum");
const uuid_1 = require("uuid");
class SpinalApiDiscoverModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, contextInfo, apiServerInfo, organ) {
        super();
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: StateEnum_1.STATES.reseted,
            graph: graph ? new spinal_core_connectorjs_type_1.Pbr(graph) : undefined,
            devices: new spinal_core_connectorjs_type_1.Lst(),
            context: contextInfo || {},
            network: apiServerInfo || {},
            organ: organ,
            creation: Date.now()
        });
    }
    setDiscoveringMode() {
        this.state.set(StateEnum_1.STATES.discovering);
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
    addToGraph() {
        if (!this.organ.discover) {
            const x = new spinal_core_connectorjs_type_1.Lst();
            x.push(this);
            this.organ.add_attr({
                discover: new spinal_core_connectorjs_type_1.Ptr(x),
            });
            Promise.resolve(true);
        }
        else {
            return new Promise((resolve, reject) => {
                this.organ.discover.load((list) => {
                    list.push(this);
                    resolve(true);
                });
            });
        }
    }
    remove() {
        return new Promise((resolve, reject) => {
            this.organ.discover.load((list) => {
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    if (element._server_id === this._server_id) {
                        list.splice(i);
                        return resolve(true);
                    }
                }
            });
        });
    }
}
exports.SpinalApiDiscoverModel = SpinalApiDiscoverModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalApiDiscoverModel]);
exports.default = SpinalApiDiscoverModel;
//# sourceMappingURL=SpinalApiDiscoverModel.js.map