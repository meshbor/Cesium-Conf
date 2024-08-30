import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  BaseSyntheticEvent,
} from "react";

import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  BillboardGraphics,
  PolylineGraphics,
  CesiumComponentRef,
  PolygonGraphics,
  Globe,
  useCesium,
  Moon,
  ModelGraphics,
  WallGraphics,
  ImageryLayer,
  // Cesium3DTileset,
} from "resium";
import CesiumMain, {
  Cartesian3,
  Ion,
  Color,
  Viewer as CesiumViewer,
  Cesium3DTile,
  Cesium3DTileset,
  HeadingPitchRoll,
  createWorldTerrainAsync,
  Model,
  UrlTemplateImageryProvider,
  WebMercatorTilingScheme,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { DroneData } from "../data/droneData";
import Satellite from "./Satellites";
import { polygons } from "../data/polygons";

const API_KEY = "07f9fcabf008153346a199b278bdcef0";

const getDronRoutes = (baseLat: number, baseLon: number, baseAlt: number) => {
  const res = Array.from({ length: 10 }, (_, i) => ({
    lat: baseLat + (i / 100) * Math.random(),
    lon: baseLon + (i / 100) * Math.random(),
    alt: baseAlt + Math.random() * 10,
  }));
  return [
    { lat: baseLat, lon: baseLon, alt: baseAlt },
    ...res,
    { lat: baseLat, lon: baseLon, alt: baseAlt },
  ];
};

const baseLat = 59.943333 + (Math.random() - 0.5) * 0.1;
const baseLon = 30.331944 + (Math.random() - 0.5) * 0.1;
const baseAlt = 1000 + Math.random() * 100;

const droneFlights: DroneData[] = Array.from({ length: 30 }, (_, i) => {
  const baseLat = 59.943333 + (Math.random() - 0.5) * 0.1;
  const baseLon = 30.331944 + (Math.random() - 0.5) * 0.1;
  const baseAlt = 1000 + Math.random() * 100;
  return {
    id: `drone${i + 1}`,
    name: `Drone ${i + 1}`,
    position: { lat: baseLat, lon: baseLon, alt: baseAlt },
    speed: 10 + Math.random() * 10,
    route: getDronRoutes(baseLat, baseLon, baseAlt),
  };
});

export const fetchWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return response.json();
};

type UavData = {
  id: string;
  position: Cartesian3;
  trail: Cartesian3[];
};

const initialUavData: UavData = {
  id: "uav1",
  position: Cartesian3.fromDegrees(-75.59777, 40.03883, 1000),
  trail: [Cartesian3.fromDegrees(-75.59777, 40.03883, 1000)],
};

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

const terrainProvider = createWorldTerrainAsync();

export const Globes: React.FC = () => {
  const { viewer } = useCesium();
  Ion.defaultAccessToken =
    "dsfsdf";

  const [uavData, setUavData] = useState<UavData[]>([initialUavData]);
  const [droneFlightsData, setDroneFlightsData] =
    useState<DroneData[]>(droneFlights);

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setUavData((prevUavData) =>
        prevUavData.map((uav) => {
          const newPosition = Cartesian3.fromDegrees(
            -75.59777 + Math.random() * 10,
            40.03883 + Math.random() * 10,
            1000 + Math.random() * 100
          );
          return {
            ...uav,
            position: newPosition,
            trail: [...uav.trail, newPosition],
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showDroneFlight = () => {
    if (viewerRef.current && baseAlt && baseLat && baseLon) {
      const viewer = viewerRef.current.cesiumElement;
      const height = viewer?.camera?.positionCartographic?.height || 0;

      const cameraHeight = height > baseAlt ? baseAlt + 1000 : height;
      const position = Cartesian3.fromDegrees(baseLon, baseLat, cameraHeight);

      viewer?.camera.flyTo({
        destination: position,
        orientation: {
          heading: viewer.camera.heading, // сохранение текущего направления камеры
          pitch: viewer.camera.pitch, // сохранение текущего наклона камеры
          roll: viewer.camera.roll, // сохранение текущего наклона по оси Z
        },
        duration: 3.0, // продолжительность анимации в секундах
      });
    }

    // viewerRef.current?.cesiumElement.
  };

  const getChurch = async () => {
    // viewerRef.current?.cesiumElement.ces
    viewerRef.current?.cesiumElement?.camera.setView({
      destination: Cartesian3.fromDegrees(
        4401744.644145314,
        225051.41078911052,
        4595420.374784433
      ),
      // orientation: HeadingPitchRoll(
      //   5.646733805039757,
      //   -0.276607153839886,
      //   6.281110875400085
      // ),
    });

    // viewerRef.current?.cesiumElement?.container.terra;
    // const tileset = await Cesium3DTileset.fromIonAssetId(16421);
    // viewerRef.current?.cesiumElement?.scene.primitives.add(tileset);
    // viewer?.scene.moon.show
  };
  const getModel = async () => {
    // try {
    //   const position = Cartesian3.fromDegrees(-123.0744619, 44.0503706, 5000);
    //   viewerRef.current?.cesiumElement?.camera.setView({
    //     destination: position,
    //     // orientation: HeadingPitchRoll(
    //     //   5.646733805039757,
    //     //   -0.276607153839886,
    //     //   6.281110875400085
    //     // ),
    //   });

    //   const heading = CesiumMain.Math.toRadians(135);
    //   const pitch = 0;
    //   const roll = 0;
    //   const hpr = new CesiumMain.HeadingPitchRoll(heading, pitch, roll);
    //   const orientation = CesiumMain.Transforms.headingPitchRollQuaternion(
    //     position,
    //     hpr
    //   );
    //   const model = await Model.fromGltfAsync({
    //     url: "../../public/assets/CesiumDrone.glb",
    //   });

    //   const entity = viewer?.entities.add({
    //     name: "../../public/assets/CesiumDrone.glb",
    //     position: position,
    //     orientation: orientation,
    //     model: {
    //       uri: "../../public/assets/CesiumDrone.glb",
    //       minimumPixelSize: 128,
    //       maximumScale: 20000,
    //     },
    //   });
    //   viewer?.scene.primitives.add(entity);
      
    // } catch (error) {
    //   console.log(`Failed to load model. ${error}`);
    // }
    // Cesium3DTileset.
  };

  useEffect(() => {
    // getChurch()
  }, []);

  const droneRange = (e: BaseSyntheticEvent) => {
    const value = e.target.value || 1;
    const arr = JSON.parse(JSON.stringify(droneFlights)) as [];
    setDroneFlightsData(() => arr.slice(0, Number(value)));
  };

  return (
    <div>
      <div style={{ position: "absolute", top: "10px", zIndex: 1000 }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setUavData([initialUavData])}>
            stopInterval
          </button>
          <button onClick={() => showDroneFlight()}>Show Drone flight</button>
          <button onClick={() => getModel()}>Show Church</button>
          <input type="range" min={1} max={30} onChange={droneRange} />
        </div>
      </div>

      <Viewer ref={viewerRef} full terrainProvider={terrainProvider}>
        {/* <Globe
        // terrainProvider={}
        // onImageryLayersUpdate={action("onImageryLayersUpdate")}
        // onTerrainProviderChange={action("onTerrainProviderChange")}
        /> */}
        {/* <Model
      url="Cesium_Air.glb"
      modelMatrix={modelMatrix}
      minimumPixelSize={128}
      maximumScale={20000}
      // onReady={action("onReady")}
      // {...events}
    /> */}
    <Entity position={position}>
  <ModelGraphics uri="assets/CesiumDrone.glb" scale={0.2}  minimumPixelSize={15} runAnimations />
</Entity>
        {/* <Entity position={position} name="Tokyo">
          <PointGraphics pixelSize={10} />
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>JSX is available here!</p>
          </EntityDescription>
        </Entity> */}

<Entity>
  <WallGraphics
    positions={Cartesian3.fromDegreesArrayHeights([
      -100.0, 40.0, 0.0,
      -105.0, 40.0, 100000.0
    ])}
    material={Color.RED.withAlpha(0.5)}
  />
</Entity>
        {uavData.map((uav) => (
          <Entity key={uav.id} position={uav.position}>
            <PolylineGraphics
              positions={uav.trail}
              width={2}
              material={Color.RED}
            />
          </Entity>
        ))}
         <Entity key={uavData[uavData.length-1].id} position={uavData[uavData.length-1].position}>
         <ModelGraphics uri="assets/Cesium_Air.glb" scale={0.2}  minimumPixelSize={55} runAnimations clampAnimations />
          </Entity>
        {droneFlightsData.map((drone) => (
          <Entity
            key={drone.id}
            name={drone.name}
            position={Cartesian3.fromDegrees(
              drone.position.lon,
              drone.position.lat,
              drone.position.alt
            )}
          >
            <PointGraphics pixelSize={10} color={Color.RED} />
            {/* <PolylineGraphics
              positions={drone.route.map((point) =>
                Cartesian3.fromDegrees(point.lon, point.lat, point.alt)
              )}
              width={2}
              material={Color.YELLOW}
            /> */}
            <ModelGraphics uri="assets/CesiumDrone.glb" scale={0.2}  minimumPixelSize={15} runAnimations />
          </Entity>
        ))}

        {/* <Satellite /> */}
        {polygons.map((polygon) => (
          <Entity key={polygon.id}>
            <PolygonGraphics
              hierarchy={polygon.positions}
              material={polygon.color}
            />
          </Entity>
        ))}
        {/* интеграция с 2gis */}
         <ImageryLayer
        imageryProvider={
         new UrlTemplateImageryProvider({
            url: "https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1",
            tilingScheme: new WebMercatorTilingScheme(),
            maximumLevel: 18,  // Максимальный уровень масштабирования
          })
        }
      />
      </Viewer>
    </div>
  );
};
