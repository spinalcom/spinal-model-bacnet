export interface INetwork {
    useBroadcast?: boolean;
    address?: string;
    port: number;
    name: string;
    type: string;
    ips: { id?: number, address: string, deviceId: string }[];
}