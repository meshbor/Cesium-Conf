import React from "react";
import { Viewer, Entity, BillboardGraphics, PointGraphics } from "resium";
import { Cartesian3, Color, Ion } from "cesium";

export const GlobeInitial: React.FC = () => {
  Ion.defaultAccessToken = "ТУТ_МОГЛА_БЫТЬ_ВАША_РЕКЛАМА";

  return (
    <>
      {/* Cesium Viewer для отображения глобуса */}
      <Viewer full>
        {/* Пример использования Entity с описанием c координатами по Москве */}
        <Entity position={Cartesian3.fromDegrees(37.6176, 55.7558)}>
          {/* Графика для отображения точки */}
          <PointGraphics pixelSize={10} color={Color.RED} />
        </Entity>
      </Viewer>
    </>
  );
};
