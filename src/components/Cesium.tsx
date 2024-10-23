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

const initialUavData2: UavData = {
  id: "uav1",
  position: Cartesian3.fromDegrees(-80.59777, 43.03883, 900),
  trail: [Cartesian3.fromDegrees(-80.59777, 43.03883, 900)],
};

const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);

const terrainProvider = createWorldTerrainAsync();

export const Globes: React.FC = () => {
  Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MzkzYTExNC02YTE3LTRjYjktOWZkNC03NGIzZjRjZDEzMWIiLCJpZCI6MjI2NDUwLCJpYXQiOjE3MjUwMTA3MTN9.C3jblft8U3-aSjhsZTJvnjr9bB6Mi1gxv_iEhXqP_Ys";

  const { viewer } = useCesium();

  const [uavData, setUavData] = useState<UavData[]>([initialUavData, initialUavData2]);
  const [show2Gis, setshow2Gis] = useState(false);
  const [droneSize, setDroneSizer] = useState(15);

  const [droneFlightsData, setDroneFlightsData] =
    useState<DroneData[]>(droneFlights);

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setUavData((prevUavData) =>
  //       prevUavData.map((uav) => {
  //         const newPosition = Cartesian3.fromDegrees(
  //           -75.59777 + Math.random() * 10,
  //           40.03883 + Math.random() * 10,
  //           1000 + Math.random() * 100
  //         );
  //         return {
  //           ...uav,
  //           position: newPosition,
  //           trail: [...uav.trail, newPosition],
  //         };
  //       })
  //     );
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const showDroneFlight = () => {
    if (viewerRef.current && baseAlt && baseLat && baseLon) {
      const viewer = viewerRef.current.cesiumElement;

      const cameraHeight =  1000;
      const position = Cartesian3.fromDegrees(baseLon, baseLat, cameraHeight);

      viewerRef.current.cesiumElement?.camera.flyTo({
        destination: position,
        orientation: {
          heading: viewerRef.current.cesiumElement.camera.heading, // сохранение текущего направления камеры
          pitch: viewerRef.current.cesiumElement.camera.pitch, // сохранение текущего наклона камеры
          roll: viewerRef.current.cesiumElement.camera.roll, // сохранение текущего наклона по оси Z
        },
        duration: 3.0, // продолжительность анимации в секундах
      });
    }
  };

  const droneRange = (e: BaseSyntheticEvent) => {
    const value = e.target.value || 1;
    const arr = JSON.parse(JSON.stringify(droneFlights)) as [];
    setDroneFlightsData(() => arr.slice(0, Number(value)));
  };
  const setDroneSize = (e: BaseSyntheticEvent) => {
    const value = e.target.value || 15;
    setDroneSizer(value);
  };



  return (
    <div>
      <div style={{ position: "absolute", top: "10px", zIndex: 1000 }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setUavData([initialUavData])}>
            show moon
          </button>
          <button onClick={() => showDroneFlight()}>Show Drone flight</button>
          <input type="range" min={1} max={30} onChange={droneRange} />
          <label htmlFor="">
            <input type="range" min={15} max={150} onChange={setDroneSize} />
          </label>

          <button onClick={() => setshow2Gis(!show2Gis)}>
            {!show2Gis ? "Show 2Gis" : "Not show 2gis"}
          </button>
        </div>
      </div>

      <Viewer
        ref={viewerRef}
        full
        shouldAnimate
      >
        {/* <Model
      url="Cesium_Air.glb"
      modelMatrix={modelMatrix}
      minimumPixelSize={128}
      maximumScale={20000}
      // onReady={action("onReady")}
      // {...events}
    /> */}
        <Entity position={position}>
          <ModelGraphics
            uri="assets/CesiumDrone.glb"
            scale={0.2}
            minimumPixelSize={15}
            runAnimations
          />
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
              -100.0, 40.0, 0.0, -105.0, 40.0, 100000.0,
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
        <Entity
          key={uavData[uavData.length - 1].id}
          position={uavData[uavData.length - 1].position}
        >
          <ModelGraphics
            uri="assets/Cesium_Air.glb"
            scale={0.2}
            minimumPixelSize={55}
            runAnimations
            clampAnimations
          />
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
            {/* <PointGraphics pixelSize={10} color={Color.RED} /> */}
            <PolylineGraphics
              positions={drone.route.map((point) =>
                Cartesian3.fromDegrees(point.lon, point.lat, point.alt)
              )}
              width={2}
              material={Color.YELLOW}
            />
            <ModelGraphics
              uri="assets/CesiumDrone.glb"
              scale={0.2}
              minimumPixelSize={droneSize}
              runAnimations={true} // Включение всех анимаций, содержащихся в модели
              clampAnimations={true} // Цикличное воспроизведение анимации
            />
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
        {show2Gis && (
          <ImageryLayer
            imageryProvider={
              new UrlTemplateImageryProvider({
                url: "https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1",
                tilingScheme: new WebMercatorTilingScheme(),
                maximumLevel: 18, // Максимальный уровень масштабирования
              })
            }
          />
        )}
      </Viewer>
    </div>
  );
};
