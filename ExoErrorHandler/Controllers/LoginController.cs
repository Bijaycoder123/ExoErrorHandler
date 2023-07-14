using MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExoErrorHandler.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        [HttpGet]
        public ActionResult Index()
        {
            return PartialView();
        }

        [HttpPost]
        public ActionResult Index(Login login)
        {
            return PartialView();
        }
    }
}