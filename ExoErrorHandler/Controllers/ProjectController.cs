using BAL.Interface;
using BAL.Services;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ExoErrorHandler.Controllers
{
    public class ProjectController : Controller
    {
        IErrorHandlerServices _iErrorHandlerServices;
        private ReturnMessageModel returnMessageModel;

        public ProjectController()
        {
            _iErrorHandlerServices = new ErrorHandlerServices();
            returnMessageModel = new ReturnMessageModel();

        }

        // GET: Project
       public ActionResult Index1([DataSourceRequest] DataSourceRequest request)
        {
            var model = _iErrorHandlerServices.getProjectList();
            return Json(model.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
        }
        public ActionResult Index()
        {
            return View();
        }


    [HttpGet]
        public ActionResult AddEdit(int id)
        {
            if (id > 0)
            {
                List<Project> productList = _iErrorHandlerServices.GetProjectListBy(id); // Assuming you have a method to retrieve the list
                List<Organization> organizationList = _iErrorHandlerServices.getOrganizationList();

                var model = new Project
                {
                    ProjectId = productList[0].ProjectId,
                    ProjectName = productList[0].ProjectName,
                    ProjectDescription = productList[0].ProjectDescription,
                    OrganizationId = productList[0].OrganizationId,
                    OrganizationName = productList[0].OrganizationName
                };
                //int test = organizationList.FirstOrDefault(x => x.OrganizationName == productList[0].OrganizationName)?.OrganizationId;
                ViewBag.OrganizationSelectList = new SelectList(organizationList, "OrganizationId", "OrganizationName");
                return View(model);

            }
            else

            {
                ViewBag.OrganizationSelectList = new SelectList(_iErrorHandlerServices.getOrganizationList(), "OrganizationId", "OrganizationName");
                return View();
            }

        }
        [HttpPost]
        public ActionResult AddEdit(Project model)
        {


            if (model.ProjectId > 0)
            {
                returnMessageModel= _iErrorHandlerServices.UpdateProject(model);
            }
            else
            {
                returnMessageModel= _iErrorHandlerServices.InsertProject(model);
            }

            return Json(returnMessageModel);
        }

        public  ActionResult Delete(int id)
        {
           returnMessageModel= _iErrorHandlerServices.DeleteProject(id);
            return Json(returnMessageModel);
        }

        public ActionResult Details(int id)
        {
            var list = new Project();
            list.ProjectList = _iErrorHandlerServices.GetProjectListBy(id);
            return View(list);
        }

    }
}