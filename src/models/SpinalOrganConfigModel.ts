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

import { Lst, Model, Pbr, spinalCore } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
import { v4 as uuidv4 } from "uuid";
import { BACNET_ORGAN_TYPE } from "../data/constants";
import SpinalDisoverModel from './SpinalDiscoverModel';
import SpinalPilotModel from './SpinalPilotModel';
import SpinalListenerModel from './SpinalListenerModel';
import SpinalBacnetValueModel from './SpinalBacnetValueModel';
import ModelsInfo from './modelsToBind';


class SpinalOrganConfigModel extends Model {

   static TYPE: string = BACNET_ORGAN_TYPE;
   static CONTEXT_TO_ORGAN_RELATION: string = "hasBmsNetworkOrgan";


   constructor(name?: string, type: string = BACNET_ORGAN_TYPE) {
      super();

      if (!name) return;

      this.add_attr({
		id: uuidv4(),
		name,
		type,
		references: {},
		restart: false,
		discover: new ModelsInfo<SpinalDisoverModel>(),
		pilot: new ModelsInfo<SpinalPilotModel>(),
		listener: new ModelsInfo<SpinalListenerModel>(),
		allbacnetCommand: new ModelsInfo<SpinalBacnetValueModel>(),
      })
   }

   private _initializeModelsList() {
		if (!this.discover) this.add_attr({ discover: new ModelsInfo<SpinalDisoverModel>() });
		if (!this.pilot) this.add_attr({ pilot: new ModelsInfo<SpinalPilotModel>() });
		if (!this.listener) this.add_attr({ listener: new ModelsInfo<SpinalListenerModel>() });
		if (!this.allbacnetCommand) this.add_attr({ allbacnetCommand: new ModelsInfo<SpinalBacnetValueModel>() });
	}

   public getModels(): { discover: ModelsInfo<SpinalDisoverModel>, pilot: ModelsInfo<SpinalPilotModel>, listener: ModelsInfo<SpinalListenerModel> , allbacnetCommand: ModelsInfo<SpinalBacnetValueModel> } {
		this._initializeModelsList();
		return { discover: this.discover, pilot: this.pilot, listener: this.listener, allbacnetCommand: this.allbacnetCommand };
	}

   public addReference(contextId: string, spinalNode: SpinalNode<any>): Promise<SpinalNode<any>> {

      if (this.references[contextId]) {
         return new Promise((resolve, reject) => {
            this.references[contextId].load((e) => {
               if (typeof e !== "undefined") return reject("The organ is already linked to this context");
               this.references.mod_attr(contextId, new Pbr(spinalNode));
               resolve(spinalNode);
            })
         });

      }

      this.references.add_attr({ [contextId]: new Pbr(spinalNode) })
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

   //// ADD MODELS

	public addDiscoverModelToGraph(discoverModel: SpinalDisoverModel): Promise<number> {
		this._initializeModelsList();
		return this.discover.addModel(discoverModel);
	}

	public addPilotModelToGraph(pilotModel: SpinalPilotModel): Promise<number> {
		this._initializeModelsList();
		return this.pilot.addModel(pilotModel);
	}

	public addListenerModelToGraph(listenerModel: SpinalListenerModel): Promise<number> {
		this._initializeModelsList();
		return this.listener.addModel(listenerModel);
	}

   public addAllBacnetModelToGraph(bacnetValueModel: SpinalBacnetValueModel): Promise<number> {
		this._initializeModelsList();
		return this.allbacnetCommand.addModel(bacnetValueModel);
	}


    //// REMOVE MODELS

	public removeDiscoverModelFromGraph(discoverModel: SpinalDisoverModel): Promise<boolean> {
		if(this.discover) return this.discover.removeModel(discoverModel);
	}

	public removePilotModelFromGraph(pilotModel: SpinalPilotModel): Promise<boolean> {
		if(this.pilot) return this.pilot.removeModel(pilotModel);
	}

	public removeListenerModelFromGraph(listenerModel: SpinalListenerModel): Promise<boolean> {
		this._initializeModelsList();
		if(this.listener) return this.listener.removeModel(listenerModel);
	}

   public removebacnetValueModelFromGraph(bacnetValueModel: SpinalBacnetValueModel): Promise<boolean> {
		this._initializeModelsList();
		if(this.allbacnetCommand) return this.allbacnetCommand.removeModel(bacnetValueModel);
	}

	  //// GET MODELS

	public getDiscoverModelFromGraph(): Promise<Lst<SpinalDisoverModel>> {
		this._initializeModelsList();
		return this.discover.getModels();
	}

	public getPilotModelFromGraph(): Promise<Lst<SpinalPilotModel>> {
		this._initializeModelsList();
		return this.pilot.getModels();
	}

	public getListenerModelFromGraph(): Promise<Lst<SpinalListenerModel>> {
		this._initializeModelsList();
		return this.listener.getModels();
	}

   public getBacnetValueModelFromGraph(): Promise<Lst<SpinalBacnetValueModel>> {
		this._initializeModelsList();
		return this.allbacnetCommand.getModels();
	}

	///// CONSUME MODELS

	public consumeDiscoverModelFromGraph(): Promise<SpinalDisoverModel[]> {
		this._initializeModelsList();
		return this.discover.consumeModels();
	}

	public consumePilotModelFromGraph(): Promise<SpinalPilotModel[]> {
		this._initializeModelsList();
		return this.pilot.consumeModels();
	}

	public consumeListenerModelFromGraph(): Promise<SpinalListenerModel[]> {
		this._initializeModelsList();
		return this.listener.consumeModels();
	}

   public consumeBacnetValueModelFromGraph(): Promise<SpinalBacnetValueModel[]> {
		this._initializeModelsList();
		return this.allbacnetCommand.consumeModels();
	}


}

//@ts-ignore
spinalCore.register_models([SpinalOrganConfigModel])
export default SpinalOrganConfigModel;
export { SpinalOrganConfigModel };
