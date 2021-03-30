"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACNET_ORGAN_TYPE = exports.SpinalOrganConfigModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const BACNET_ORGAN_TYPE = "BACNET_ORGAN";
exports.BACNET_ORGAN_TYPE = BACNET_ORGAN_TYPE;
class SpinalOrganConfigModel extends spinal_core_connectorjs_type_1.Model {
    constructor(name) {
        super();
        this.add_attr({
            name: name,
            type: BACNET_ORGAN_TYPE,
            references: {},
            state: false,
        });
    }
    addReference(contextId, spinalNode) {
        if (this.references[contextId]) {
            throw new Error("The organ is already linked to this context");
        }
        this.references.add_attr({ [contextId]: new spinal_core_connectorjs_type_1.Ptr(spinalNode) });
    }
    isReferencedInContext(contextId) {
        return typeof this.references[contextId] !== "undefined";
    }
    removeReference(contextId) {
        if (this.references[contextId]) {
            return new Promise((resolve, reject) => {
                this.references[contextId].load(node => {
                    this.references.rem_attr(contextId);
                    resolve(node);
                });
            });
        }
        // this.references.load((ref) => {
        //    if (typeof spinalNode === "undefined" && ref[contextId]) {
        //       ref.rem_attr(contextId);
        //       return;
        //    } else if (ref[contextId]) {
        //       for (let i = 0; i < ref[contextId].length; i++) {
        //          const element = ref[contextId][i];
        //          if (spinalNode._server_id === element._server_id) {
        //             ref[contextId].splice(i);
        //          }
        //       }
        //    }
        // })
    }
}
exports.SpinalOrganConfigModel = SpinalOrganConfigModel;
SpinalOrganConfigModel.TYPE = BACNET_ORGAN_TYPE;
SpinalOrganConfigModel.CONTEXT_TO_ORGAN_RELATION = "hasBmsNetworkOrgan";
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOrganConfigModel]);
exports.default = SpinalOrganConfigModel;
//# sourceMappingURL=SpinalOrganConfigModel.js.map