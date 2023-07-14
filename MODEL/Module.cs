
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class Module
    {
        public Module()
        {
            ModuleList = new List<Module>();
        }

        public int ModuleId { get; set; }

        public string ModuleName { get; set; }

        public string ModuleDescription { get; set; }

        public int ProjectId { get; set; }
        public int OrganizationId { get; set; }
        [Display(Name = "Project Name")]

        public string ProjectName { get; set; }
        [Display(Name = "Organization Name")]
        public string OrganizationName { get; set; }
        public string CreatedBy { get; set; }
        // public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        //  public DateTime ModifiedDate { get; set; }

        public List<Module> ModuleList { get; set; }
    }
}