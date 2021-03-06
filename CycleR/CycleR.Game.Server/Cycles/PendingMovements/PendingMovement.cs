﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public class PendingMovement : IDisposable
    {
        public PendingMovement(MapLocation currentMapLocation, Vector3 startLocation, MovementFlag direction)
        {
            CurrentMapLocation = currentMapLocation;
            StartLocation = startLocation;
            Direction = direction;
        }

        public Vector3 StartLocation { get; set; }
        public MovementFlag Direction { get; set; }
        public MapLocation CurrentMapLocation { get; set; }
        public bool Disposed { get; private set; }

        public bool ReadyToMove(Cycle owner)
        {
            return !CurrentMapLocation.SameAs(owner.MovementController.HeadLocation) || owner.MovementController.Velocity.IsZero();
        }

        public void Dispose()
        {
            Disposed = true;
            StartLocation = null;
            CurrentMapLocation = null;
        }

        public override string ToString()
        {
            return StartLocation + " | " + CurrentMapLocation;
        }
    }
}
