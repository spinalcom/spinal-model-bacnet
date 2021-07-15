import { spinalCore, Model, Ptr, Lst, Choice } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import { IRequest } from '../Data/IRequest';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';


class SpinalPilotModel extends Model {
   constructor(organ: SpinalOrganConfigModel, request: IRequest | IRequest[]) {
      super();
      this.add_attr({
         id: uuidv4(),
         state: new Choice(0, ["normal", "process", "success", "error"]),
         organ: organ,
         requests: Array.isArray(request) ? request : [request]
      })
   }

   
   public setNormalMode() {
      this.state.set("normal");
   }

   public setProcessMode() {
      this.state.set("process");
   }

   public setSuccessMode() {
      this.state.set("success");
   }

   public setErrorMode() {
      this.state.set("error");
   }

   public isNormal() {
      return this.state.get() === "normal";
   }

   public addToNode(endpoint: SpinalNode<any>): Promise<any> {
      return new Promise((resolve) => {
         if (!endpoint.info.pilot) {
            const model = new Lst();
            model.push(this);
            endpoint.info.add_attr({ pilot: new Ptr(model) });
            resolve(model);
         } else {
            endpoint.info.pilot.load(lst => {
               lst.push(this)
               resolve(lst);
            })
         }
      }).then((res) => {
         this.add_attr({node : endpoint});
         return res;
      })
   }

   public removeToNode() : Promise<any> {
      return new Promise((resolve, reject) => {
         if(this.node) {
            this.node.info.pilot.load(lst => {
               for (let i = 0; i < lst.length; i++) {
                  const element = lst[i];
                  if(element.id.get() === this.id.get()) {
                     lst.splice(i);
                     break;
                  }
               }
               resolve(true);
            })
         } else {
            resolve(false)
         }
      });
   }
}

spinalCore.register_models([SpinalPilotModel])
export default SpinalPilotModel;
export { SpinalPilotModel };