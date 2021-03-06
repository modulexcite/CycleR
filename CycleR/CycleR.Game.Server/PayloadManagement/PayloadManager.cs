﻿using System.Collections.Generic;
using CycleR.Utilities;

namespace CycleR.Game.Server
{
    public static class PayloadManager
    {
        private static PayloadCompressor _compressor = new PayloadCompressor();

        public static object[] BuildInitializationPayload(List<Cycle> cycles)
        {
            var compressedCycles = new List<object>(cycles.Count);

            foreach (Cycle cycle in cycles)
            {
                compressedCycles.Add(_compressor.Compress(cycle));
            }

            var payload = new InitializationPayload
            {
                Cycles = compressedCycles
            };

            return _compressor.Compress(payload);
        }

        public static object[] BuildMovementPayload(Cycle cycle, MovementFlag direction)
        {
            var payload = new MovementPayload
            {
                ID = cycle.ID,
                Direction = direction,
                Position = cycle.MovementController.Position
            };

            return _compressor.Compress(payload);
        }

        public static object[] BuildDeathPayload(Cycle cycle)
        {
            var payload = new DeathPayload
            {
                ID = cycle.ID,
                DiedAt = cycle.MovementController.Position,
            };

            return _compressor.Compress(payload);
        }

        public static object[] BuildCollisionPayload(Cycle cycle)
        {
            CollisionPayload payload = new CollisionPayload
            {
                ID = cycle.ID,
                CollidedAt = cycle.MovementController.Position
            };

            return _compressor.Compress(payload);
        }

        public static object GetCompressionContacts()
        {
            return _compressor.CompressionContracts();
        }
    }
}
