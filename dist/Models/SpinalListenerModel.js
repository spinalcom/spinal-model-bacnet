"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalListenerModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalListenerModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, context, network, bmsDevice, organ, monitor) {
        super();
        this.add_attr({
            id: uuid_1.v4(),
            graph: new spinal_core_connectorjs_type_1.Ptr(graph),
            listen: true,
            saveTimeSeries: false,
            // timeInterval: timeInterval,
            device: new spinal_core_connectorjs_type_1.Ptr(bmsDevice),
            context: new spinal_core_connectorjs_type_1.Ptr(context),
            network: new spinal_core_connectorjs_type_1.Ptr(network),
            organ: new spinal_core_connectorjs_type_1.Ptr(organ),
            monitor: monitor
        });
    }
}
exports.SpinalListenerModel = SpinalListenerModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalListenerModel]);
exports.default = SpinalListenerModel;
//# sourceMappingURL=SpinalListenerModel.js.map