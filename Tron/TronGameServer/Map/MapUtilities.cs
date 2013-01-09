﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tron.Utilities;

namespace Tron.GameServer
{
    public class MapUtilities : IDisposable
    {        
        private Size _mapSize;
        private Size _halfMapSize;
        private Size _floorTileSize;
        private Size _dimensions;

        public MapUtilities(Size mapSize, Size floorTileSize)
        {
            _mapSize = mapSize;
            _halfMapSize = _mapSize * .5;
            _floorTileSize = floorTileSize;
            _dimensions = new Size(_mapSize.Width / _floorTileSize.Width, _mapSize.Height / _floorTileSize.Height);
        }

        public MapLocation ToMapLocation(Vector3 position)
        {
            return new MapLocation(Math.Abs((position.z + _halfMapSize.Height) / _floorTileSize.Height), Math.Abs((position.x + _halfMapSize.Width) / _floorTileSize.Width));
        }

        public Vector3 ToPosition(MapLocation position, double y)
        {
            return new Vector3(position.Column * _floorTileSize.Width - _halfMapSize.Width, y, position.Row * _floorTileSize.Height - _halfMapSize.Height);
        }

        public bool OutOfBounds(MapLocation location)
        {
            return RowOutOfBounds(location.Row) || ColumnOutOfBounds(location.Column);
        }

        public bool OutOfBounds(Vector3 position)
        {
            return XOutOfBounds(position.x) || ZOutOfBounds(position.z);
        }

        public bool RowOutOfBounds(int row)
        {
            return row < 0 || row >= _dimensions.Height;
        }

        public bool XOutOfBounds(double x)
        {
            return x < -_halfMapSize.Width || x > _halfMapSize.Width;
        }

        public bool ZOutOfBounds(double z)
        {
            return z < -_halfMapSize.Height || z > _halfMapSize.Height;
        }

        public bool ColumnOutOfBounds(int column)
        {
            return column < 0 || column >= _dimensions.Width;
        }

        public MapLocation GetCycleMapLocation(Cycle cycle)
        {
            // Normalize to the quadrant in which the cycle lies
            MapLocation quadrant = ToMapLocation(cycle.MovementController.GetLinePosition(cycle.MovementController.Position));

            return quadrant;
        }

        public void Dispose()
        {
            _mapSize = null;
            _halfMapSize = null;
            _floorTileSize = null;
            _dimensions = null;
        }
    }
}