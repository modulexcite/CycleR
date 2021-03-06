/// <reference path="../jquery.d.ts" />
/// <reference path="Core/Vector3.d.ts" />
/// <reference path="Core/Vector2.d.ts" />
/// <reference path="Core/Color.d.ts" />
/// <reference path="Core/Fog.d.ts" />
/// <reference path="Core/EventTarget.d.ts" />
/// <reference path="Object3D/Object3D.d.ts" />
/// <reference path="Object3D/Scene.d.ts" />
/// <reference path="Object3D/Light.d.ts" />
/// <reference path="Object3D/Mesh.d.ts" />
/// <reference path="Geometry/Geometry.d.ts" />
/// <reference path="Geometry/CubeGeometry.d.ts" />
/// <reference path="Geometry/PlaneGeometry.d.ts" />
/// <reference path="Materials/Material.d.ts" />
/// <reference path="Materials/MeshBasicMaterial.d.ts" />
/// <reference path="Cameras/Camera.d.ts" />
/// <reference path="Cameras/PerspectiveCamera.d.ts" />
/// <reference path="Cameras/TrackballControls.d.ts" />
/// <reference path="Cameras/FirstPersonControls.d.ts" />
/// <reference path="Loaders/JSONLoader.d.ts" />
/// <reference path="Renderers/Renderer.d.ts" />

interface IThree {
    Scene(): any;
    CubeGeometry(width: number, height: number, depth: number, segmentsWidth?: number, segmentsHeight?: number, segmentsDepth?: number, materials?: any, sides?: any): any;
    FogExp2(hex: number, density: number): any;
    DirectionalLight(hex: number, intensity: number, distance?: number): any;
    PlaneGeometry(width: number, height: number, widthSegments?: number, heightSegments?: number): any;
    MeshBasicMaterial(parameters: any): any;
    MeshNormalMaterial(parameters?: any): any;
    Mesh(geometry: IGeometry, material: IMaterial);    
    PerspectiveCamera(fov: number, aspect: number, near: number, far: number): void;
    WebGLRenderer(options?: any): any;
    SVGRenderer(): any;
    CanvasRenderer(): any;
    Detector: any;
    TrackballControls(camera: ICamera, domElement?: HTMLCanvasElement): any;
    FirstPersonControls(camera: ICamera, domElement?: HTMLCanvasElement): any;
    Vector3(x?: number, y?: number, z?: number): any;
    Vector2(x?: number, y?: number): any;
    JSONLoader(): any;
    MeshFaceMaterial(): any;
    SceneUtils: any;
}

declare var THREE: IThree, THREEx;