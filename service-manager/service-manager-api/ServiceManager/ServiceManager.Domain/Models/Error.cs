using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ServiceManager.Domain.Models
{
    public class Error
    {
        public string StatucCode { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
