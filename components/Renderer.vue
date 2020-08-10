<template>
    <v-container ref="container" class="text-center" fluid>
        <v-progress-linear
            class="loader"
            v-model="progress"
            v-if="!loaded"
            color="primary"
            height="15"
        >
            <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>
        <div>
            Polygon Count: {{ polycount }}
        </div>
    </v-container>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default {
    props: ['src', 'width', 'height'],
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            loader: null,
            progress: 0,
            polycount: 0,
            loaded: false,
            error: null
        }
    },
    async mounted() {

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;
        this.renderer.physicallyCorrectLights = true;
        
        this.$refs.container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );
        
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.minZoom = 1;
        controls.maxZoom = 1.5;
        controls.enableDamping = true;
        controls.dampingFactor = 0.2;
        controls.rotateSpeed = 0.3;
        controls.enablePan = false;

        this.camera.position.set( 0, 3, 5 );
        controls.update();

        this.loader = new GLTFLoader();
        let dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/examples/js/libs/draco/');
        this.loader.setDRACOLoader(dracoLoader);
        this.loader.load(this.src, (gltf) => {
            this.scene.add(gltf.scene);
        }, (xhr) => {
            this.progress = xhr.loaded / xhr.total * 100;
            if (this.progress >= 100) {
                this.loaded = true;
            }
        }, (error) => {
            this.error = error;
        });

        this.renderer.setAnimationLoop( () => {
            controls.update();
            this.renderer.render(this.scene, this.camera);
            this.polycount = this.renderer.info.render.triangles;
        });
    },
    beforeDestroy() {
        this.renderer.setAnimationLoop( null );
    }
}
</script>

<style>
canvas {
    margin: 0 auto;
    display: block;
    outline: none;
}
</style>
<style scoped>
.loader {
    max-width: 300px;
}
</style>
