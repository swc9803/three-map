import * as THREE from "three";
import { ArcballControls } from "three/addons/Addons.js";

export default class App {
	constructor() {
		this._setupThreeJs();
		this._setupCamera();
		this._setupLight();
		this._setupControls();
		this._setupModel();
		this._setupEvents();
	}

	_setupThreeJs() {
		const divContainer = document.querySelector("#app");
		this._divContainer = divContainer;
		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setClearColor(new THREE.Color("#2c3e50"), 1);
		renderer.setPixelRatio(window.devicePixelRatio);

		divContainer.appendChild(renderer.domElement);

		this._renderer = renderer;
		const scene = new THREE.Scene();
		this._scene = scene;
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 30);
		camera.position.z = 18;
		this._camera = camera;
	}

	_setupLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this._scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(5, 3, 5);
		this._scene.add(directionalLight);
	}

	_setupModel() {
		const radius = 7;
		const earthGeometry = new THREE.SphereGeometry(radius, 64, 32);
		const earthMaterial = new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load("./earth_day_4096.jpg"),
		});
		const earth = new THREE.Mesh(earthGeometry, earthMaterial);
		this._scene.add(earth);
		this._earth = earth;
	}

	_setupControls() {
		const arcballControls = new ArcballControls(this._camera, this._divContainer, this._scene);
		arcballControls.enablePan = false;

		this.arcballControls = arcballControls;
	}

	_setupEvents() {
		window.onresize = this.resize.bind(this);
		this.resize();

		this._clock = new THREE.Clock();
		requestAnimationFrame(this.render.bind(this));
	}

	update() {
		const delta = this._clock.getDelta();

		this.arcballControls.update();
	}

	render() {
		this.update();

		this._renderer.render(this._scene, this._camera);

		requestAnimationFrame(this.render.bind(this));
	}

	resize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}
}
