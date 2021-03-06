/// <reference path="../Interfaces/Game/PayloadManagement/CompressionContracts.d.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />
/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />

module PayloadDecompressor {
    var collidableContract: ICollidableCompressionContract,
        cycleContract: ICycleCompressionContract,
        initializationPayloadContract: IInitializationCompressionContract,
        movementPayloadContract: IMovementCompressionContract,
        deathPayloadContract: IDeathCompressionContract,
        collisionPayloadContract: ICollisionCompressionContract;

    function decompressCollidable(compressedCollidable: any[]): ICollidableDecompressed {
        return <ICollidableDecompressed>{
            ID: compressedCollidable[collidableContract.ID],
            Alive: !!compressedCollidable[collidableContract.Alive],
            Position: new THREE.Vector3(compressedCollidable[collidableContract.Position_X], compressedCollidable[collidableContract.Position_Y], compressedCollidable[collidableContract.Position_Z]),
            Velocity: new THREE.Vector3(compressedCollidable[collidableContract.Velocity_X], compressedCollidable[collidableContract.Velocity_Y], compressedCollidable[collidableContract.Velocity_Z]),
            Rotation: compressedCollidable[collidableContract.Rotation]
        };
    }

    function decompressCycle(compressedCycle: any[]): ICycleDecompressed {
        var decompressedCycle: ICycleDecompressed = <ICycleDecompressed>decompressCollidable(compressedCycle);

        decompressedCycle.TrailColor = compressedCycle[cycleContract.TrailColor];

        return decompressedCycle;
    }

    export function LoadContracts(contracts: ICompressionContracts): void {
        collidableContract = contracts.CollidableCompressionContract;
        cycleContract = contracts.CycleCompressionContract;
        initializationPayloadContract = contracts.InitializationCompressionContract;
        movementPayloadContract = contracts.MovementCompressionContract;
        deathPayloadContract = contracts.DeathCompressionContract;
        collisionPayloadContract = contracts.CollisionCompressionContract;
    }

    export function DecompressCollisionPayload(compressedPayload: any): ICollisionPayloadDecompressed {
        var decompressedPayload: ICollisionPayloadDecompressed = <ICollisionPayloadDecompressed>{};

        decompressedPayload.ID = compressedPayload[collisionPayloadContract.ID];
        decompressedPayload.CollidedAt = new THREE.Vector3(compressedPayload[collisionPayloadContract.CollidedAt_X], compressedPayload[collisionPayloadContract.CollidedAt_Y], compressedPayload[collisionPayloadContract.CollidedAt_Z]);

        return decompressedPayload;
    }

    export function DecompressDeathPayload(compressedPayload: any): IDeathPayloadDecompressed {
        var decompressedPayload: IDeathPayloadDecompressed = <IDeathPayloadDecompressed>{};

        decompressedPayload.ID = compressedPayload[deathPayloadContract.ID];
        decompressedPayload.DiedAt = new THREE.Vector3(compressedPayload[deathPayloadContract.DiedAt_X], compressedPayload[deathPayloadContract.DiedAt_Y], compressedPayload[deathPayloadContract.DiedAt_Z]);

        return decompressedPayload;
    }

    export function DecompressMovementPayload(compressedPayload: any): IMovementPayloadDecompressed {
        var decompressedPayload: IMovementPayloadDecompressed = <IMovementPayloadDecompressed>{};

        decompressedPayload.ID = compressedPayload[movementPayloadContract.ID];
        decompressedPayload.Direction = compressedPayload[movementPayloadContract.Direction];
        decompressedPayload.Position = new THREE.Vector3(compressedPayload[movementPayloadContract.Position_X], compressedPayload[movementPayloadContract.Position_Y], compressedPayload[movementPayloadContract.Position_Z]);

        return decompressedPayload;
    }

    export function DecompressInitializationPayload(compressedPayload: any): IInitializationPayloadDecompressed {
        var decompressedPayload: IInitializationPayloadDecompressed = <IInitializationPayloadDecompressed>{},
        decompressedCycles: ICycleDecompressed[] = [];

        decompressedPayload.Cycles = compressedPayload[initializationPayloadContract.Cycles];

        for (var i: number = decompressedPayload.Cycles.length - 1; i >= 0; i--) {
            decompressedCycles.push(decompressCycle(<any>decompressedPayload.Cycles[i]));
        }

        decompressedPayload.Cycles = decompressedCycles;

        return decompressedPayload;
    }
}