export interface IRequest {
    address: string;
    SADR?: any;
    deviceId: number | string;
    objectId: {
        type: number | string;
        instance: number | string;
    };
    value: string | number | boolean;
}
