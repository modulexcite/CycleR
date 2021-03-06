﻿using System;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class MapConfiguration : IMapConfiguration
    {
        public MapConfiguration()
        {
            FLOOR_TILE_SIZE = new Size(50);
            MAP_SIZE = new Size(10000);
            WALL_SIZE = new Size(MAP_SIZE.Width, 2000);
            MAP_START_PADDING = 500;
        }

        public Size FLOOR_TILE_SIZE { get; set; }
        public Size MAP_SIZE { get; set; }
        public Size WALL_SIZE { get; set; }
        public int MAP_START_PADDING { get; set; }
    }
}
