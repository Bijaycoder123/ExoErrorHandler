using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MODEL
{
    public class Project
    {
        public Project()
        {
            ProjectList = new List<Project>();
        }

        public int ProjectId { get; set; }


        [Display(Name = "Project Name")]
        public string ProjectName { get; set; }

        [Display(Name = "Project Description")]
        public string ProjectDescription { get; set; }

        [Display(Name = "Organization Name")]
        public int OrganizationId { get; set; }
        public string CreatedBy { get; set; }
        //public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        //public DateTime ModifiedDate { get; set; }
        [Display(Name = "Organization Name")]
        public string OrganizationName { get; set; }
        public List<Project> ProjectList { get; set; }
    }
}
