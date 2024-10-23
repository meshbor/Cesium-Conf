import React, { useRef } from "react";
import {
  Viewer,
  Entity,
  PointGraphics,
} from "resium";

import { Cartesian3, Color, Ion, Viewer as CesiumViewer } from "cesium";

export const GlobeInitial: React.FC = () => {

  Ion.defaultAccessToken = "ТУТ_МОГЛА_БЫТЬ_ВАША_РЕКЛАМА";

  return (
    <>
      {/* Cesium Viewer для отображения глобуса*/}
      <Viewer full>

        {/* Сущность Entity с описанием координат */}
        <Entity position={Cartesian3.fromDegrees(37.6176, 55.7558)}>

        {/* Элемент график для отображения точки */}
          <PointGraphics pixelSize={10} color={Color.RED} />
        
        </Entity>
      
      </Viewer>
    </>
  );
};
