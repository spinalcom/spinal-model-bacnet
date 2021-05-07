"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalBacnetValueModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
class SpinalBacnetValueModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, network, node, sensor) {
        super();
        this.add_attr({
            context: new spinal_core_connectorjs_type_1.Ptr(context),
            node: new spinal_core_connectorjs_type_1.Ptr(node),
            graph: new spinal_core_connectorjs_type_1.Ptr(graph),
            network: new spinal_core_connectorjs_type_1.Ptr(network),
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
            node.info.rem_attr('bacnet');
        });
    }
    getAllItem() {
        const promises = [this.loadItem('context'), this.loadItem('node'), this.loadItem('graph'), this.loadItem('network')];
        return Promise.all(promises).then(([context, node, graph, network]) => {
            return {
                context,
                node,
                graph,
                network
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