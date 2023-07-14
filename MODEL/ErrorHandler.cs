using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class ErrorHandler
    {
        public int ErroHandlerId { get; set; }

        public int OrganizationId { get; set; }

        public int ProjectId { get; set; }

        public int ModuleId { get; set; }

        public int StatusId { get; set; }

        public int UserId { get; set; }

        public string Image { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
