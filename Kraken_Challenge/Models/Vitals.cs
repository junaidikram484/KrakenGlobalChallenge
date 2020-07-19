using System;
using System.Collections.Generic;

namespace Kraken_Challenge.Models
{
    public partial class Vitals
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public decimal Tempreture { get; set; }
        public decimal HeartRate { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public long? IsActive { get; set; }
        public string OrganizationId { get; set; }
        public string BusinessUnitId { get; set; }
        public string DeviceId { get; set; }
    }
}
