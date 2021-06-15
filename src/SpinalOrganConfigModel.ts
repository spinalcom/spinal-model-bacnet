import { spinalCore, Model, Ptr, Lst } from 'spinal-core-connectorjs_type';
import { v4 as uuidv4 } from "uuid";

const BACNET_ORGAN_TYPE = "BACNET_ORGAN";

class SpinalOrganConfigModel extends Model {

   static TYPE: string = BACNET_ORGAN_TYPE;
   static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";


   constructor(name: string) {
      super();

      this.add_attr({
         id: uuidv4(),
         name: name,
         type: BACNET_ORGAN_TYPE,
         references: {},
         restart: false,
      })
   }

   addReference(contextId: string, spinalNode: any) {

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

   isReferencedInContext(contextId) {
      if (typeof this.references[contextId] === "undefined") return Promise.resolve(false);

      return new Promise((resolve, reject) => {
         this.references[contextId].load((e) => {
            if (typeof e === "undefined") return resolve(false)
            resolve(true);
         })
      });

   }

   removeReference(contextId: string) {
      if (this.references[contextId]) {
         return new Promise((resolve, reject) => {
            this.references[contextId].load(node => {
               this.references.rem_attr(contextId);
               resolve(node);
            })
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


spinalCore.register_models([SpinalOrganConfigModel])
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel, BACNET_ORGAN_TYPE }