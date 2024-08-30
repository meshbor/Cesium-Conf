import { Cartesian3, Color } from "cesium";

export const polygons = [
    {
      id: 'polygon1',
      positions: [
        Cartesian3.fromDegrees(-100.0, 40.0),
        Cartesian3.fromDegrees(-105.0, 40.0),
        Cartesian3.fromDegrees(-105.0, 35.0),
        Cartesian3.fromDegrees(-100.0, 35.0),
      ],
      color: Color.RED.withAlpha(0.5),
    },
    {
      id: 'polygon2',
      positions: [
        Cartesian3.fromDegrees(-80.0, 30.0),
        Cartesian3.fromDegrees(-85.0, 30.0),
        Cartesian3.fromDegrees(-85.0, 25.0),
        Cartesian3.fromDegrees(-80.0, 25.0),
      ],
      color: Color.GREEN.withAlpha(0.5),
    },
    {
      id: 'polygon3',
      positions: [
        Cartesian3.fromDegrees(-60.0, 50.0),
        Cartesian3.fromDegrees(-65.0, 50.0),
        Cartesian3.fromDegrees(-65.0, 45.0),
        Cartesian3.fromDegrees(-60.0, 45.0),
      ],
      color: Color.BLUE.withAlpha(0.5),
    },
  ];
  