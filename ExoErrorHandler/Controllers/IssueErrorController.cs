using BAL.Interface;
using BAL.Services;
using MODEL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ExoErrorHandler.Controllers
{
    public class IssueErrorController : Controller
    {
        // GET: IssueError
        IErrorHandlerServices _iErrorHandlerServices;

        public IssueErrorController()
        {
            _iErrorHandlerServices = new ErrorHandlerServices();

        }
        public ActionResult Index()
        {
            ViewBag.OrganizationSelectList = new SelectList(_iErrorHandlerServices.getOrganizationList(), "OrganizationId", "OrganizationName");
            ViewBag.DeveloperSelectList = new SelectList(_iErrorHandlerServices.getDeveloperList(), "UserId", "FullName");

            return View();
        }
        public ActionResult AddIssue(IssueErrorView modl)
        {
            string imagePath = SaveFile(modl.Image);
            modl.ImagePath = imagePath;
            _iErrorHandlerServices.SaveIssueError(modl);
            return RedirectToAction("Index");

        }

        public string SaveFile(HttpPostedFileBase File)
        {
            //Use Namespace called :  System.IO  
            string FileName = Path.GetFileNameWithoutExtension(File.FileName);

            //To Get File Extension  
            string FileExtension = Path.GetExtension(File.FileName);

            //Add Current Date To Attached File Name  
            FileName = Guid.NewGuid().ToString().Substring(0, 4) + "-" + FileName.Trim() + FileExtension;

            //Get Upload path from Web.Config file AppSettings.  
            //  string UploadPath = ConfigurationManager.AppSettings["UserImagePath"].ToString();
            var UploadPath = Path.Combine(Server.MapPath("~/Content/Upload"), FileName);

            //Its Create complete path to store in server.  
            var imgPath = UploadPath;

            //To copy and save file into server.  
            File.SaveAs(imgPath);

            string fPath = "/Content/Upload/" + FileName;
            return (fPath);
        }



    }
}