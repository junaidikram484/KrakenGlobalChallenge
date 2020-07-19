using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kraken_Challenge.Models.ViewModels
{
    public class VMVitalsApi
    {
        public string organizationId { get; set; }
        public string businessUnitId { get; set; }
        public string deviceId { get; set; }
        public int heartRate { get; set; }
        public decimal temperature { get; set; }
        public string humanVitalId { get; set; }
        public string partitionKey { get; set; }
        public string rowKey { get; set; }
        public string timestamp { get; set; }
        public string eTag { get; set; }
    }
}
