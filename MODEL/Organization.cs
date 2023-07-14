using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MODEL
{
    public class Organization
    {
        public Organization()
        {
            OrganizationList = new List<Organization>();
        }

        public int OrganizationId { get; set; }

        [Display(Name = "Organization Name")]
        [Required(ErrorMessage = "Please enter  Organization name"), MaxLength(30),MinLength(3)]
        public string OrganizationName { get; set; }


        [Required(ErrorMessage = "Please enter  Organization Description"), MaxLength(30),MinLength(3)]
        [Display(Name = "Organization Description")]
        public string OrganizationDescription { get; set; }


        [Required(ErrorMessage = "Please enter  Organization Address"), MaxLength(30), MinLength(3)]
        [Display(Name = "Organization Address")]
        public string OrganizationAddress { get; set; }


        [RegularExpression(@"^\(?([9][0-9]{9})\)$")]
        [Required(ErrorMessage = "Please enter  Phonenumber"), MaxLength(10), MinLength(10)]
        [Display(Name = "Organization Phone")]
        public string OrganizationPhone { get; set; }



        [Required(ErrorMessage = "Please enter  Contact Person"), MaxLength(30), MinLength(3)]
        [Display(Name = "Contact  Person")]
        public string OrganizationContactPerson { get; set; }


        public string CreatedBy { get; set; }

        //public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        // public DateTime ModifiedDate { get; set; }

        public List<Organization> OrganizationList { get; set; }
    }
}
