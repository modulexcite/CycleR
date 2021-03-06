var EnvironmentRenderer = (function () {
    function EnvironmentRenderer(_scene) {
        this._scene = _scene;
        this.RenderFog();
        this.RenderLight();
    }
    EnvironmentRenderer.prototype.RenderFog = function () {
        this._scene.fog = new THREE.FogExp2(3355443, 0.0003);
        this._scene.fog.color.setHSV(0.1, 0.1, 1);
    };
    EnvironmentRenderer.prototype.RenderLight = function () {
        this._light = new THREE.DirectionalLight(16777215, 1.5);
        this._light.position.set(0, 1, 1).normalize();
        this._scene.add(this._light);
    };
    return EnvironmentRenderer;
})();
//@ sourceMappingURL=EnvironmentRenderer.js.map
