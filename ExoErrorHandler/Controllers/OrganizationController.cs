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
    public class OrganizationController : Controller
    {
        IErrorHandlerServices _iErrorHandlerServices;
        private ReturnMessageModel returnMessage;
        public OrganizationController()
        {
            _iErrorHandlerServices = new ErrorHandlerServices();
            returnMessage = new ReturnMessageModel();
        }

        // GET: Organization
        public ActionResult Index1([DataSourceRequest] DataSourceRequest request)
        {
            var model = _iErrorHandlerServices.getOrganizationList();
            return Json(model.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);

        }
        public ActionResult Index()
        {
            //var list = new Organization();
            //list.OrganizationList = _iErrorHandlerServices.getOrganizationList();
            //return View(list);
            return View();
        }

        [HttpGet]
        public ActionResult AddEdit(int id)
        {

            if (id > 0)
            {
                List<Organization> organizationList = _iErrorHandlerServices.GetOrganizationListById(id); // Assuming you have a method to retrieve the list

                var model = new Organization
                {
                    OrganizationId = organizationList[0].OrganizationId,
                    OrganizationName = organizationList[0].OrganizationName,
                    OrganizationDescription = organizationList[0].OrganizationDescription,
                    OrganizationAddress = organizationList[0].OrganizationAddress,
                    OrganizationPhone = organizationList[0].OrganizationPhone,
                    OrganizationContactPerson = organizationList[0].OrganizationContactPerson
                };

                return View(model);

            }
            else

            {
                return PartialView();
            }

        }
        [HttpPost]
        public ActionResult AddEdit(Organization model)
        {
            if (model.OrganizationId > 0)
            {
                returnMessage = _iErrorHandlerServices.UpdateOrganization(model);
            }
            else
            {
                returnMessage = _iErrorHandlerServices.InsertOrganization(model);
            }

            return Json(returnMessage);
        }

        public ActionResult Delete(int id)
        {
           returnMessage= _iErrorHandlerServices.DeleteOrganization(id);
            return Json(returnMessage);
        }
        public ActionResult Details(int id)
        {
            var list = new Organization();
            list.OrganizationList = _iErrorHandlerServices.GetOrganizationListById(id);
            return View(list);
        }

    }
}