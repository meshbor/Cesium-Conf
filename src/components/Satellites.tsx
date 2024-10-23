/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { EllipseGraphics, Entity, ModelGraphics } from "resium";
import { Cartesian3, Color, Math as CesiumMath } from "cesium";

const Satellite: React.FC = () => {
  const satelliteModels = [
    {
      id: "satellite1",
      name: "Satellite Alpha",
      position: { lat: 0, lon: 0, alt: 35786 }, // геостационарная орбита
      modelUrl: "../../public/assets/Cesium_Air.glb", // Укажите путь к вашей 3D-модели
    },
    // {
    //   id: 'satellite2',
    //   name: 'Satellite Beta',
    //   position: { lat: 45, lon: 45, alt: 35786 },
    //   modelUrl: 'https://example.com/satellite-model.gltf',
    // },
  ];
  return (
    <>
      {satelliteModels.map((satellite) => (
        <Entity
          key={satellite.id}
          name={satellite.name}
          position={Cartesian3.fromDegrees(
            satellite.position.lon,
            satellite.position.lat,
            satellite.position.alt * 1000
          )}
        >
          <ModelGraphics uri={satellite.modelUrl} scale={100} />
          {/* <EllipseGraphics
            semiMajorAxis={35786 * 1000}
            semiMinorAxis={35786 * 1000}
            material={Color.BLUE.withAlpha(0.2)}
            rotation={CesiumMath.toRadians(45)}
          /> */}
        </Entity>
      ))}
    </>
  );
};

export default Satellite;
