import * as cdk from '@aws-cdk/core';
import {KubernetesVersion}  from '@aws-cdk/aws-eks';

// SSP Lib
import * as ssp from '@shapirov/cdk-eks-blueprint';
import { EC2ClusterProvider } from '@shapirov/cdk-eks-blueprint';


export default class ScratchpadConstruct extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        // Setup platform team
        // Setup platform team
        const accountID = process.env.CDK_DEFAULT_ACCOUNT!
        // AddOns for the cluster.
        const addOns: Array<ssp.ClusterAddOn> = [
            new ssp.AwsLoadBalancerControllerAddOn,
            new ssp.NginxAddOn,
            new ssp.MetricsServerAddOn,
            new ssp.ClusterAutoScalerAddOn
        ];

        const stackID = `${id}-blueprint`;

        const clusterProvider = new EC2ClusterProvider( {
            desiredSize: 3,
            maxSize: 3,
            version: KubernetesVersion.V1_20
        });
        
        new ssp.EksBlueprint(scope, { id: stackID, addOns }, {
            env: {
                region: 'us-east-2',
            },
        });
    }
}
