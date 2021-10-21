"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACNET_ORGAN_TYPE = exports.SpinalOrganConfigModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
const BACNET_ORGAN_TYPE = "BACNET_ORGAN";
exports.BACNET_ORGAN_TYPE = BACNET_ORGAN_TYPE;
class SpinalOrganConfigModel extends spinal_core_connectorjs_type_1.Model {
    constructor(name, type = BACNET_ORGAN_TYPE) {
        super();
        this.add_attr({
            id: uuid_1.v4(),
            name,
            type,
            references: {},
            restart: false,
        });
    }
    addReference(contextId, spinalNode) {
        if (this.references[contextId]) {
            return new Promise((resolve, reject) => {
                this.references[contextId].load((e) => {
                    if (typeof e !== "undefined")
                        return reject("The organ is already linked to this context");
                    this.references.mod_attr(contextId, new spinal_core_connectorjs_type_1.Ptr(spinalNode));
                    resolve(spinalNode);
                });
            });
        }
        this.references.add_attr({ [contextId]: new spinal_core_connectorjs_type_1.Ptr(spinalNode) });
        return Promise.resolve(spinalNode);
    }
    isReferencedInContext(contextId) {
        if (typeof this.references[contextId] === "undefined")
            return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            this.references[contextId].load((e) => {
                if (typeof e === "undefined")
                    return resolve(false);
                resolve(true);
            });
        });
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
    }
}
exports.SpinalOrganConfigModel = SpinalOrganConfigModel;
SpinalOrganConfigModel.TYPE = BACNET_ORGAN_TYPE;
SpinalOrganConfigModel.CONTEXT_TO_ORGAN_RELATION = "hasBmsNetworkOrgan";
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalOrganConfigModel]);
exports.default = SpinalOrganConfigModel;
//# sourceMappingURL=SpinalOrganConfigModel.js.map