import {EventDispatcher, TextureLoader, RepeatWrapping, MeshBasicMaterial, MeshPhongMaterial, FrontSide, DoubleSide, Vector2, Vector3, Face3, Geometry, Shape, ShapeGeometry, Mesh} from 'three';
import {EVENT_CHANGED} from '../core/events.js';
import {Configuration, configWallHeight} from '../core/configuration.js';

export class Floor extends EventDispatcher {
    constructor(scene, room) {
        super();
        this.scene = scene;
        this.room = room;
        this.floorPlane = null;
        this.roofPlane = null;
        this.changedevent = () => {this.redraw();};
        this.init();
    }

    switchWireframe(flag) {
        if (this.floorPlane) this.floorPlane.visible = !flag;
        if (this.roofPlane) this.roofPlane.visible = !flag;
    }

    init() {
        this.room.addEventListener(EVENT_CHANGED, this.changedevent);
        this.floorPlane = this.buildFloor();
        this.roofPlane = this.buildRoofVaryingHeight();
        this.addToScene();
    }

    redraw() {
        this.removeFromScene();
        this.floorPlane = this.buildFloor();
        this.roofPlane = this.buildRoofVaryingHeight();
        this.addToScene();
    }

    buildFloor() {
        var textureSettings = this.room.getTexture();
        var floorTexture = new TextureLoader().load(textureSettings.url);
        floorTexture.wrapS = RepeatWrapping;
        floorTexture.wrapT = RepeatWrapping;
        floorTexture.repeat.set(1, 1);
        
        var floorMaterialTop = new MeshPhongMaterial({
            map: floorTexture,
            side: DoubleSide,
            color: 0xcccccc,
            specular: 0x0a0a0a,
            shininess: 30
        });

        var textureScale = textureSettings.scale || 1;
        var points = [];
        this.room.interiorCorners.forEach((corner) => {
            points.push(new Vector2(corner.x / textureScale, corner.y / textureScale));
        });
        
        var shape = new Shape(points);
        var geometry = new ShapeGeometry(shape);
        var floor = new Mesh(geometry, floorMaterialTop);

        floor.rotation.set(Math.PI / 2, 0, 0);
        floor.scale.set(textureScale, textureScale, textureScale);
        floor.receiveShadow = true;
        floor.castShadow = false;
        return floor;
    }

    buildRoofVaryingHeight() {
        var roofMaterial = new MeshPhongMaterial({
            side: DoubleSide,
            color: 0xffffff,
            specular: 0x0a0a0a,
            shininess: 30
        });

        var geometry = new Geometry();
        var wallHeight = Configuration.getNumericValue(configWallHeight);

        // Create vertices for the roof
        this.room.corners.forEach((corner) => {
            var elevation = corner.elevation || wallHeight;
            var vertex = new Vector3(corner.x, elevation, corner.y);
            geometry.vertices.push(vertex);
        });

        // Create faces for the roof using triangulation
        for (var i = 2; i < geometry.vertices.length; i++) {
            var face = new Face3(0, i-1, i);
            geometry.faces.push(face);
        }

        // Ensure proper normal calculation
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        var roof = new Mesh(geometry, roofMaterial);
        roof.castShadow = true;
        roof.receiveShadow = true;
        return roof;
    }

    addToScene() {
        if (this.floorPlane) this.scene.add(this.floorPlane);
        if (this.roofPlane) this.scene.add(this.roofPlane);
    }

    removeFromScene() {
        if (this.floorPlane) this.scene.remove(this.floorPlane);
        if (this.roofPlane) this.scene.remove(this.roofPlane);
    }

    showRoof(flag) {
        if (this.roofPlane) {
            this.roofPlane.visible = flag;
        }
    }
} 