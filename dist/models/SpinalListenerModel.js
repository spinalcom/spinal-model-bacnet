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
exports.SpinalListenerModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalListenerModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, network, bmsDevice, organ, monitor) {
        super();
        if (!graph || !context || !network || !bmsDevice || !organ || !monitor)
            return;
        this.add_attr({
            id: (0, uuid_1.v4)(),
            graph: new spinal_core_connectorjs_type_1.Pbr(graph),
            listen: true,
            saveTimeSeries: false,
            // timeInterval: timeInterval,
            device: new spinal_core_connectorjs_type_1.Pbr(bmsDevice),
            context: new spinal_core_connectorjs_type_1.Pbr(context),
            network: new spinal_core_connectorjs_type_1.Pbr(network),
            organ: new spinal_core_connectorjs_type_1.Pbr(organ),
            monitor: monitor
        });
    }
    getAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            //   const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
            const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork()];
            const [graph, organ, context, device, network, profile] = yield Promise.all(promises);
            return {
                graph,
                organ,
                context,
                device,
                network,
                profile
            };
        });
    }
    getGraph() {
        return this._loadData('graph');
    }
    getOrgan() {
        return this._loadData('organ');
    }
    getContext() {
        return this._loadData('context');
    }
    getBmsDevice() {
        return this._loadData('bmsDevice');
    }
    getNetwork() {
        return this._loadData('network');
    }
    //  public getProfile(): Promise<SpinalNode> {
    //      return this._loadData('profile');
    //  }
    addToGraph() {
        return this.getOrgan().then((organModel) => __awaiter(this, void 0, void 0, function* () {
            // const organModel = await organNode.getElement(true);
            // if (organModel) {
            yield this.addToDevice(); // add reference to listener in device
            return organModel.addListenerModelToGraph(this); // add listener to organ listener list
            // }
        }));
    }
    removeFromGraph() {
        const promises = [this.getOrgan(), this.getBmsDevice()];
        return Promise.all(promises).then(([organModel, deviceNode]) => __awaiter(this, void 0, void 0, function* () {
            // const organModel = await organNode.getElement(true);
            // if (organModel) {
            deviceNode.info.remove_attr('listener'); // remove reference to listener in device
            return organModel.removeListenerModelFromGraph(this); // remove listener from organ listener list
            // }
        }));
    }
    addToDevice() {
        return this.getBmsDevice().then((device) => {
            if (device.info.listeners)
                device.info.rem_attr('listener');
            device.info.add_attr({ listener: new spinal_core_connectorjs_type_1.Pbr(this) });
        });
    }
    _loadData(dataName) {
        return new Promise((resolve, reject) => {
            try {
                if (this[dataName] === undefined)
                    throw new Error(`${dataName} not found`);
                this[dataName].load((data) => resolve(data));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.SpinalListenerModel = SpinalListenerModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalListenerModel]);
exports.default = SpinalListenerModel;
//# sourceMappingURL=SpinalListenerModel.js.map