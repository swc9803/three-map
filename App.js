import * as THREE from "three";
import { ArcballControls, CSS2DRenderer, CSS2DObject } from "three/addons/Addons.js";

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

		const labelRenderer = new CSS2DRenderer();
		labelRenderer.domElement.style.position = "absolute";
		labelRenderer.domElement.style.top = "0px";
		document.body.appendChild(labelRenderer.domElement);
		this._labelRenderer = labelRenderer;

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

		const cities = [
			{ name: "서울", latitude: 37.5665, longitude: 126.978 },
			{ name: "도쿄", latitude: 35.6895, longitude: 139.6917 },
			{ name: "베이징", latitude: 39.9042, longitude: 116.4074 },
			{ name: "뉴델리", latitude: 28.6139, longitude: 77.209 },
			{ name: "방콕", latitude: 13.7563, longitude: 100.5018 },
			{ name: "하노이", latitude: 21.0278, longitude: 105.8342 },
			{ name: "마닐라", latitude: 14.5995, longitude: 120.9842 },
			{ name: "쿠알라룸푸르", latitude: 3.139, longitude: 101.6869 },
			{ name: "싱가포르", latitude: 1.3521, longitude: 103.8198 },
			{ name: "자카르타", latitude: -6.2088, longitude: 106.8456 },
			{ name: "예루살렘", latitude: 31.7683, longitude: 35.2137 },
			{ name: "리야드", latitude: 24.7136, longitude: 46.6753 },
			{ name: "테헤란", latitude: 35.6892, longitude: 51.389 },
			{ name: "앙카라", latitude: 39.9255, longitude: 32.8662 },
			{ name: "런던", latitude: 51.5074, longitude: -0.1278 },
			{ name: "파리", latitude: 48.8566, longitude: 2.3522 },
			{ name: "베를린", latitude: 52.52, longitude: 13.405 },
			{ name: "로마", latitude: 41.9028, longitude: 12.4964 },
			{ name: "마드리드", latitude: 40.4168, longitude: -3.7038 },
			{ name: "모스크바", latitude: 55.7558, longitude: 37.6173 },
			{ name: "바르샤바", latitude: 52.2297, longitude: 21.0122 },
			{ name: "키이우", latitude: 50.4501, longitude: 30.5234 },
			{ name: "암스테르담", latitude: 52.3676, longitude: 4.9041 },
			{ name: "브뤼셀", latitude: 50.8503, longitude: 4.3466 },
			{ name: "베른", latitude: 46.948, longitude: 7.4474 },
			{ name: "빈", latitude: 48.2082, longitude: 16.3738 },
			{ name: "스톡홀름", latitude: 59.3293, longitude: 18.0686 },
			{ name: "오슬로", latitude: 59.9139, longitude: 10.7522 },
			{ name: "헬싱키", latitude: 60.1699, longitude: 24.9384 },
			{ name: "아테네", latitude: 37.9838, longitude: 23.7275 },
			{ name: "카이로", latitude: 30.0444, longitude: 31.2357 },
			{ name: "아부자", latitude: 9.0765, longitude: 7.3986 },
			{ name: "프리토리아", latitude: -25.7461, longitude: 28.1874 },
			{ name: "나이로비", latitude: -1.2921, longitude: 36.8219 },
			{ name: "라바트", latitude: 34.0209, longitude: -6.8416 },
			{ name: "알제", latitude: 36.7525, longitude: 3.042 },
			{ name: "워싱턴 D.C.", latitude: 38.8951, longitude: -77.0364 },
			{ name: "오타와", latitude: 45.4215, longitude: -75.6972 },
			{ name: "멕시코 시티", latitude: 19.4326, longitude: -99.1332 },
			{ name: "아바나", latitude: 23.1136, longitude: -82.3661 },
			{ name: "킹스턴", latitude: 17.9712, longitude: -76.7928 },
			{ name: "파나마 시티", latitude: 8.9943, longitude: -79.5197 },
			{ name: "브라질리아", latitude: -15.7797, longitude: -47.9297 },
			{ name: "부에노스아이레스", latitude: -34.6037, longitude: -58.3816 },
			{ name: "산티아고", latitude: -33.4489, longitude: -70.6693 },
			{ name: "보고타", latitude: 4.6097, longitude: -74.0817 },
			{ name: "리마", latitude: -12.0464, longitude: -77.0428 },
			{ name: "캔버라", latitude: -35.2809, longitude: 149.13 },
			{ name: "웰링턴", latitude: -41.2865, longitude: 174.7762 },
			{ name: "레이캬비크", latitude: 64.1353, longitude: -21.8952 },
			{ name: "누크", latitude: 64.1835, longitude: -51.7214 },
		];
		this.cities = cities;

		cities.forEach((city, i) => {
			const marker = this._createCapitalLabel(city.name, city.latitude, city.longitude, radius);
			this._scene.add(marker);
		});
	}

	_createCapitalLabel(name, lat, lon, radius) {
		const markerDiv = document.createElement("div");
		markerDiv.className = "marker";
		markerDiv.textContent = name;

		const marker = new CSS2DObject(markerDiv);
		marker.position.copy(this._getPosFromLatLonRad(lat, lon, radius));

		markerDiv.addEventListener("click", (e) => {
			const div = e.target;

			const targetPosition = marker.position.clone();
			this._animateCamera(targetPosition);

			this._labelRenderer.domElement.querySelectorAll(".selected").forEach((item) => {
				item.classList.remove("selected");
			});

			div.classList.add("selected");
		});

		return marker;
	}

	_sphericalInterpolation(v1, v2) {
		v1.normalize();
		v2.normalize();
		const o = new THREE.Vector3(0, 0, 0);

		const o_v1 = v1.sub(o);
		const o_v2 = v2.sub(o);
		const angle = o_v1.angleTo(o_v2);

		const axis = o_v1.clone().cross(o_v2);
		axis.normalize();

		const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);

		return v1.applyQuaternion(q);
	}

	_animateCamera(targetPosition) {
		const startPosition = this._camera.position.clone();
		const dist = startPosition.distanceTo(this._scene.position);
		const newPosition = this._sphericalInterpolation(startPosition.clone(), targetPosition.clone()).multiplyScalar(dist);

		this._camera.position.copy(newPosition);
		this._camera.lookAt(this._scene.position);
	}

	_getPosFromLatLonRad(lat, lon, radius) {
		var phi = (90 - lat) * (Math.PI / 180);
		var theta = (lon + 180) * (Math.PI / 180);

		let x = -(radius * Math.sin(phi) * Math.cos(theta));
		let z = radius * Math.sin(phi) * Math.sin(theta);
		let y = radius * Math.cos(phi);

		return { x, y, z };
	}

	_setupControls() {
		const arcballControls = new ArcballControls(this._camera, this._labelRenderer.domElement, this._scene);
		arcballControls.enablePan = false;
		arcballControls.setGizmosVisible(false);

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

		const raycaster = new THREE.Raycaster();
		const posCam = new THREE.Vector3();
		const posLabel = new THREE.Vector3();

		this._camera.getWorldPosition(posCam);

		this._scene.children.forEach((item) => {
			if (!item.isCSS2DObject) return;

			item.getWorldPosition(posLabel);
			raycaster.set(posCam.clone(), posLabel.clone().sub(posCam));
			const ints = raycaster.intersectObjects(this._earth, false);
			if (ints.length > 0) {
				const l1 = posLabel.distanceTo(posCam);
				const l2 = ints[0].distance;
				item.visible = l1 <= l2;
			}
		});
	}

	render() {
		this.update();

		this._renderer.render(this._scene, this._camera);
		this._labelRenderer.render(this._scene, this._camera);

		requestAnimationFrame(this.render.bind(this));
	}

	resize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
		this._labelRenderer.setSize(window.innerWidth, window.innerHeight);
		// this._labelRenderer.setSize(width, height);
	}
}
