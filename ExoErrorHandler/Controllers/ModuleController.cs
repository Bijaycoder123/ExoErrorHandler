
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
    public class ModuleController : Controller
    {
        IErrorHandlerServices _iErrorHandlerServices;
        private ReturnMessageModel returnMessage; 

        public ModuleController()
        {
            _iErrorHandlerServices = new ErrorHandlerServices();
            returnMessage = new ReturnMessageModel();

        }

        // GET: Module
        public ActionResult Index()
        {
      
            return View();
        }
        public ActionResult GetModule([DataSourceRequest] DataSourceRequest request)
        {

                var model = _iErrorHandlerServices.getModuleList();
                return Json(model.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public ActionResult AddEdit(int id)
        {
            if (id > 0)
            {

                List<Module> moduleList = _iErrorHandlerServices.GetModuleListById(id); // Assuming you have a method to retrieve the list

                var model = new Module
                {
                    ModuleId = moduleList[0].ModuleId,
                    ModuleName = moduleList[0].ModuleName,
                    ModuleDescription = moduleList[0].ModuleDescription,
                    OrganizationId = moduleList[0].OrganizationId,
                    OrganizationName = moduleList[0].OrganizationName,
                    ProjectId = moduleList[0].ProjectId,
                    ProjectName = moduleList[0].ProjectName
                };


                ViewBag.OrganizationList = new SelectList(_iErrorHandlerServices.getOrganizationList(), "OrganizationId", "OrganizationName");

                return View(model);
            }
            else

            {
                ViewBag.OrganizationList = new SelectList(_iErrorHandlerServices.getOrganizationList(), "OrganizationId", "OrganizationName");

                return PartialView();
            }

        }
        [HttpPost]
        public ActionResult AddEdit(Module model)
        {
            if (model.ModuleId > 0)
            {
              returnMessage =  _iErrorHandlerServices.UpdateModule(model);
            }
            else
            {
              returnMessage = _iErrorHandlerServices.InsertModule(model);
            }


            return Json(returnMessage);
        }

        public JsonResult GetProjectByOrganizationId(int organizationId)
        {

            List<Project> projectList;

            projectList = _iErrorHandlerServices.getProjectListByOrganizationId(organizationId);

            return Json(projectList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetModuleByProjectId(int organizationId, int projectId)
        {

            List<Module> moduleList;

            moduleList = _iErrorHandlerServices.getModuleListByProjectId(organizationId, projectId);

            return Json(moduleList, JsonRequestBehavior.AllowGet);
        }



        public ActionResult Delete(int id)
        {
            _iErrorHandlerServices.DeleteModule(id);
            return RedirectToAction("Index");
        }
        public ActionResult Details(int id)
        {
            var list = new Module();
            list.ModuleList = _iErrorHandlerServices.GetModuleListById(id);
            return View(list);
        }

    }
}