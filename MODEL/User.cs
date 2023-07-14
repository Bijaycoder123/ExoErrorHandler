using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MODEL
{
    public class User
    {
        public User()
        {
            UserList = new List<User>();
        }
        public int UserId { get; set; }

        [Display(Name = "Full Name")]
        public string FullName { get; set; }
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; }
        public List<User> UserList { get; set; }
    }
}
