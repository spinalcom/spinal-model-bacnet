import { spinalCore, Model, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import { BACNET_ORGAN_TYPE } from "../Data/constants";


class SpinalOrganConfigModel extends Model {

   static TYPE: string = BACNET_ORGAN_TYPE;
   static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";


   constructor(name: string, type: string = BACNET_ORGAN_TYPE) {
      super();

      this.add_attr({
         id: uuidv4(),
         name,
         type,
         references: {},
         restart: false,
      })
   }

   public addReference(contextId: string, spinalNode: SpinalNode<any>): Promise<SpinalNode<any>> {

      if (this.references[contextId]) {
         return new Promise((resolve, reject) => {
            this.references[contextId].load((e) => {
               if (typeof e !== "undefined") return reject("The organ is already linked to this context");
               this.references.mod_attr(contextId, new Ptr(spinalNode));
               resolve(spinalNode);
            })
         });

      }

      this.references.add_attr({ [contextId]: new Ptr(spinalNode) })
      return Promise.resolve(spinalNode);
   }

   public isReferencedInContext(contextId: string): Promise<boolean> {
      if (typeof this.references[contextId] === "undefined") return Promise.resolve(false);

      return new Promise((resolve, reject) => {
         this.references[contextId].load((e) => {
            if (typeof e === "undefined") return resolve(false)
            resolve(true);
         })
      });

   }

   public removeReference(contextId: string): Promise<SpinalNode<any>> {
      if (this.references[contextId]) {
         return new Promise((resolve, reject) => {
            this.references[contextId].load(node => {
               this.references.rem_attr(contextId);
               resolve(node);
            })
         });
      }
   }
}


spinalCore.register_models([SpinalOrganConfigModel])
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel }