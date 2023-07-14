
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace MODEL
{
    public class IssueErrorView
    {
        public IssueErrorView()
        {
            IssueList = new List<IssueErrorView>();
        }

        public int ErroHandlerId { get; set; }
        public string ErroHandlerName { get; set; }

        public int OrganizationId { get; set; }
        public string OrganizationName { get; set; }

        public int ProjectId { get; set; }
        public string ProjectName { get; set; }

        public int ModuleId { get; set; }
        public string ModuleName { get; set; }

        public int StatusId { get; set; }
        public string StatusName { get; set; }

        public int UserId { get; set; }

        [Display(Name = "Developer")]

        public int FullName { get; set; }

        [Display(Name = "Comment")]
        public string ErrorDescription { get; set; }

        public HttpPostedFileBase Image { get; set; }
        ////[Required]
        //[NotMapped]
        //public IFormFile Image { get; set; }
        public string ImagePath { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

        public List<IssueErrorView> IssueList { get; set; }
    }
}
