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
exports.SpinalPilotModel = void 0;
const spinal_core_connectorjs_type_1 = require("spinal-core-connectorjs_type");
const uuid_1 = require("uuid");
class SpinalPilotModel extends spinal_core_connectorjs_type_1.Model {
    constructor(organ, request) {
        super();
        this.add_attr({
            id: (0, uuid_1.v4)(),
            state: new spinal_core_connectorjs_type_1.Choice(0, ["normal", "process", "success", "error"]),
            organ: organ,
            requests: Array.isArray(request) ? request : [request]
        });
    }
    setNormalMode() {
        this.state.set("normal");
    }
    setProcessMode() {
        this.state.set("process");
    }
    setSuccessMode() {
        this.state.set("success");
    }
    setErrorMode() {
        this.state.set("error");
    }
    isNormal() {
        return this.state.get() === "normal";
    }
    addToNode(endpoint) {
        return new Promise((resolve) => {
            if (!endpoint.info.pilot) {
                const model = new spinal_core_connectorjs_type_1.Lst();
                model.push(this);
                endpoint.info.add_attr({ pilot: new spinal_core_connectorjs_type_1.Ptr(model) });
                resolve(model);
            }
            else {
                endpoint.info.pilot.load(lst => {
                    lst.push(this);
                    resolve(lst);
                });
            }
        }).then((res) => {
            this.add_attr({ node: endpoint });
            return res;
        });
    }
    removeToNode() {
        return new Promise((resolve, reject) => {
            if (this.node) {
                this.node.info.pilot.load(lst => {
                    for (let i = 0; i < lst.length; i++) {
                        const element = lst[i];
                        if (element.id.get() === this.id.get()) {
                            lst.splice(i);
                            break;
                        }
                    }
                    resolve(true);
                });
            }
            else {
                resolve(false);
            }
        });
    }
}
exports.SpinalPilotModel = SpinalPilotModel;
spinal_core_connectorjs_type_1.spinalCore.register_models([SpinalPilotModel]);
exports.default = SpinalPilotModel;
//# sourceMappingURL=SpinalPilotModel.js.map