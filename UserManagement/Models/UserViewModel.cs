using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UserManagement.Models
{
    public class UserViewModel
    {
        public int Id;
        [Required, StringLength(50)]
        public string Name;
        [Range(1, 999)]
        public int Age;
        [StringLength(50)]
        public string Address;
    }
}