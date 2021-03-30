"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalDisoverModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const stateEnum_1 = require("./stateEnum");
class SpinalDisoverModel extends spinal_core_connectorjs_type_1.Model {
    constructor(graph, contextInfo, network, organ) {
        super();
        this.add_attr({
            state: stateEnum_1.STATES.reseted,
            graph: graph ? new spinal_core_connectorjs_type_1.Ptr(graph) : undefined,
            devices: new spinal_core_connectorjs_type_1.Lst(),
            context: contextInfo || {},
            network: network || {},
            organ: organ,
            creation: Date.now()
        });
    }
    setDiscoveringMode() {
        this.state.set(stateEnum_1.STATES.discovering);
        // setTimeout(() => {
        //    if (this.state.get() === STATES.discovering) this.setTimeoutMode();
        // }, 40000)
    }
    setDiscoveredMode() {
        this.state.set(stateEnum_1.STATES.discovered);
    }
    setResetedMode() {
        this.state.set(stateEnum_1.STATES.reseted);
    }
    setTimeoutMode() {
        this.state.set(stateEnum_1.STATES.timeout);
    }
    setCreatingMode() {
        this.state.set(stateEnum_1.STATES.creating);
    }
    setCreatedMode() {
        this.state.set(stateEnum_1.STATES.created);
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
        // this.graph.load(graph => {
        this.organ.discover.load((list) => {
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element._server_id === this._server_id) {
                    list.splice(i);
                    return;
                }
            }
        });
        // })
    }
}
exports.SpinalDisoverModel = SpinalDisoverModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalDisoverModel]);
exports.default = SpinalDisoverModel;
//# sourceMappingURL=SpinalDiscoverModel.js.map