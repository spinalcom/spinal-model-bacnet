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
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalBacnetValueModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, organ, network, node, sensor) {
        super();
        this.add_attr({
            id: uuid_1.v4(),
            context: new spinal_core_connectorjs_type_1.Ptr(context),
            node: new spinal_core_connectorjs_type_1.Ptr(node),
            graph: new spinal_core_connectorjs_type_1.Ptr(graph),
            network: new spinal_core_connectorjs_type_1.Ptr(network),
            organ: new spinal_core_connectorjs_type_1.Ptr(organ),
            state: 'wait',
            sensor: sensor,
            progress: 0
        });
    }
    addToNode() {
        return this.loadItem('node').then((node) => {
            node.info.add_attr({ bacnet: new spinal_core_connectorjs_type_1.Ptr(this) });
        });
    }
    remToNode() {
        return this.loadItem('node').then((node) => {
            if (node.info.bacnet)
                node.info.rem_attr("bacnet");
            node.info.rem_attr('bacnet');
        });
    }
    getAllItem() {
        const promises = [this.loadItem('context'), this.loadItem('node'), this.loadItem('graph'), this.loadItem('network'), this.loadItem('organ')];
        return Promise.all(promises).then(([context, node, graph, network, organ]) => {
            return {
                context,
                node,
                graph,
                network,
                organ
            };
        });
    }
    loadItem(name) {
        return new Promise((resolve, reject) => {
            this[name].load((res) => {
                resolve(res);
            });
        });
    }
    setWaitState() {
        this.state.set("wait");
    }
    setRecoverState() {
        this.state.set("recover");
    }
    setProgressState() {
        this.state.set("progress");
    }
    setNormalState() {
        this.state.set("normal");
    }
    setSuccessState() {
        this.state.set("success");
    }
    setErrorState() {
        this.state.set("error");
    }
}
exports.SpinalBacnetValueModel = SpinalBacnetValueModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalBacnetValueModel]);
exports.default = SpinalBacnetValueModel;
//# sourceMappingURL=SpinalBacnetValueModel.js.map