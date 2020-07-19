using System;
using System.Collections.Generic;

namespace Kraken_Challenge.Models
{
    public partial class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public long? IsActive { get; set; }
        public string Password { get; set; }
    }
}
