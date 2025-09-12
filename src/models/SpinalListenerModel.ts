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

import { spinalCore, Model, Pbr } from 'spinal-core-connectorjs_type';
import { SpinalGraph } from 'spinal-model-graph';
import SpinalOrganConfigModel from './SpinalOrganConfigModel';
import { v4 as uuidv4 } from "uuid";
import { SpinalContext, SpinalNode } from 'spinal-env-viewer-graph-service';
import SpinalMonitorInfoModel from './SpinalMonitorInfoModel';
import { IDataNodes } from '../data/IRequest';

class SpinalListenerModel extends Model {
   constructor(graph?: SpinalGraph, context?: SpinalContext, network?: SpinalNode, bmsDevice?: SpinalNode, organ?: SpinalOrganConfigModel, monitor?: SpinalMonitorInfoModel) {
      super();
      if (!graph || !context || !network || !bmsDevice || !organ || !monitor) return;

      this.add_attr({
         id: uuidv4(),
         graph: new Pbr(graph),
         listen: true,
         saveTimeSeries: false,
         // timeInterval: timeInterval,
         device: new Pbr(bmsDevice),
         context: new Pbr(context),
         network: new Pbr(network),
         organ: new Pbr(organ),
         monitor: monitor
      })
   }

public async getAllData(): Promise<IDataNodes> {

      //   const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork(), this.getProfile()];
        const promises = [this.getGraph(), this.getOrgan(), this.getContext(), this.getBmsDevice(), this.getNetwork()];

        const [graph, organ, context, device, network, profile] = await Promise.all(promises);

        return {
            graph,
            organ,
            context,
            device,
            network,
            profile
        } as IDataNodes;
    }

    public getGraph(): Promise<SpinalGraph> {
        return this._loadData('graph') as Promise<SpinalGraph>;
    }

    public getOrgan(): Promise<SpinalOrganConfigModel> {
        return this._loadData('organ') as Promise<SpinalOrganConfigModel>;
    }

    public getContext(): Promise<SpinalContext> {
        return this._loadData('context') as Promise<SpinalContext>;
    }

    public getBmsDevice(): Promise<SpinalNode> {
        return this._loadData('device') as Promise<SpinalNode>;
    }

    public getNetwork(): Promise<SpinalNode> {
        return this._loadData('network') as Promise<SpinalNode>;
    }

   //  public getProfile(): Promise<SpinalNode> {
   //      return this._loadData('profile');
   //  }

   public addToGraph(): Promise<number> {
        return this.getOrgan().then(async (organModel: SpinalOrganConfigModel) => {
            // const organModel = await organNode.getElement(true);
            // if (organModel) {
                await this.addToDevice(); // add reference to listener in device
                return organModel.addListenerModelToGraph(this); // add listener to organ listener list
            // }
        })
    }

    public removeFromGraph(): Promise<boolean> {
        const promises = [this.getOrgan(), this.getBmsDevice()];

        return Promise.all(promises).then(async ([organModel, deviceNode]: [SpinalOrganConfigModel, SpinalNode]) => {
            // const organModel = await organNode.getElement(true);
            // if (organModel) {
                deviceNode.info.remove_attr('listener'); // remove reference to listener in device
                return organModel.removeListenerModelFromGraph(this); // remove listener from organ listener list
            // }
        })
    }

    public addToDevice() {
        return this.getBmsDevice().then((device) => {
            if (device.info.listeners) device.info.rem_attr('listener');

            device.info.add_attr({ listener: new Pbr(this) });
        });
    }


    private _loadData(dataName: string): Promise<SpinalNode | SpinalOrganConfigModel> {
        return new Promise((resolve, reject) => {
            try {
                if (this[dataName] === undefined) throw new Error(`${dataName} not found`);

                this[dataName].load((data) => resolve(data));
            } catch (error) {
                reject(error);
            }
        });
    }


}

spinalCore.register_models([SpinalListenerModel])
export default SpinalListenerModel;
export { SpinalListenerModel }