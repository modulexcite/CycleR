/// <reference path="../Cycles/Cycle.ts" />
/// <reference path="GameScreen.ts" />
/// <reference path="GameScreenHandler.ts" />
/// <reference path="../Interfaces/SignalR/SignalR.d.ts" />
/// <reference path="../Interfaces/ThreeJS/Three.d.ts" />
/// <reference path="../Interfaces/Game/Game.d.ts" />

class Loading extends GameScreen {
    static NAME: string = "Loading";

    constructor (onCompletion: Function, gameServer: IHubProxy) {
        super(Loading.NAME, onCompletion, gameServer);

        this.GameServer.client.configure = (configuration: IGameConfiguration) => {
            console.log("Match initialized!");
            this.configureGame(configuration);
        }        
    }

    private configureGame(configuration: IGameConfiguration): void {
        this.configureMap(configuration.MapConfig);
        this.configureCycles(configuration.CycleConfig);

        // Notify server that we've been configured, now we're ready to start!
        console.log("Starting Game...");
        super.Done(MainGame.NAME);
        this.GameServer.server.ReadyToStartGame();
    }

    private configureMap(configuration: IMapConfiguration): void {
        Map.FLOOR_TILE_SIZE = new Size(configuration.FLOOR_TILE_SIZE.Width, configuration.FLOOR_TILE_SIZE.Height);
        Map.MAP_SIZE = new Size(configuration.MAP_SIZE.Width, configuration.MAP_SIZE.Height);
        Map.WALL_SIZE = new Size(configuration.WALL_SIZE.Width, configuration.WALL_SIZE.Height);
    }

    private configureCycles(configuration: ICycleConfiguration): void {
        Cycle.BASE_CYCLE_SCALE = new THREE.Vector3(configuration.BASE_CYCLE_SCALE.x, configuration.BASE_CYCLE_SCALE.y, configuration.BASE_CYCLE_SCALE.z);
        Cycle.SCALE = new THREE.Vector3(configuration.SCALE.x, configuration.SCALE.y, configuration.SCALE.z);
        Cycle.SIZE = new THREE.Vector2(configuration.SIZE.x, configuration.SIZE.y);
        CycleMovementController.Y_OFFSET = configuration.Y_OFFSET;
        CycleMovementController.MAX_SPEED = configuration.MAX_SPEED;
    }

    public Load(): void {
        console.log("Loading screen loaded!");
        console.log("Initializing Match...");
        this.GameServer.server.StartMatch();
    }

    public Done(): void {
        super.Done(MainGame.NAME);
    }
}