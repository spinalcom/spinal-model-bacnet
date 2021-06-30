import { Model } from 'spinal-core-connectorjs_type';
import { SpinalNode } from 'spinal-env-viewer-graph-service';
declare class SpinalMonitorInfoModel extends Model {
    constructor(profil: SpinalNode<any>, monit: Array<{
        monitor: boolean;
        interval: number;
        children: [];
    }>);
    getMonitoringData(): Array<{
        monitor: boolean;
        interval: number;
        children: [];
    }>;
}
export default SpinalMonitorInfoModel;
export { SpinalMonitorInfoModel };
