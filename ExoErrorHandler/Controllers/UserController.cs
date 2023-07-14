
using MODEL;
using BAL.Interface;
using BAL.Services;
using System.Web.Mvc;
using System.Collections.Generic;
using DAL;

namespace Exo_ErrorHandler.Controllers
{
    public class UserController : Controller
    {
        IErrorHandlerServices _iErrorHandlerService;
        public UserController()
        {
            _iErrorHandlerService = new ErrorHandlerServices();
        }
        public ActionResult Index()
        {
            var m = new User();
            m.UserList = _iErrorHandlerService.getUserList();
            return View(m);
        }

        [HttpGet]
        public ActionResult AddEdit(int id)
        {
            if (id > 0)
            {
                List<User> UserList = _iErrorHandlerService.GetUserListById(id); // Assuming you have a method to retrieve a single user by ID

                if (UserList != null)
                {
                    var model = new User
                    {
                        UserId = UserList[0].UserId,
                        FullName = UserList[0].FullName,
                        Email = UserList[0].Email,
                        UserName = UserList[0].UserName,
                        Password = UserList[0].Password,
                        RoleId = UserList[0].RoleId
                    };
                    ViewBag.RoleSelectList = new SelectList(_iErrorHandlerService.getRoleList(), "RoleId", "RoleName");

                    return View(model);
                }
                else
                {
                    // Handle the case where the user with the specified ID does not exist
                    return RedirectToAction("NotFound", "Error"); // Assuming you have an "Error" controller with a "NotFound" action
                }
            }
            else
            {
                ViewBag.RoleSelectList = new SelectList(_iErrorHandlerService.getRoleList(), "RoleId", "RoleName");
                var model = new User();
                return View(model);
            }
        }

        [HttpPost]
        public ActionResult AddEdit(User model)
        {


            if (model.UserId > 0)
            {
                _iErrorHandlerService.UpdateUser(model);
            }
            else
            {
                _iErrorHandlerService.InserUser(model);
            }

            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            _iErrorHandlerService.DeleteUser(id);
            return RedirectToAction("Index");
        }
        public ActionResult Details(int id)
        {
            var m = new User();
            m.UserList = _iErrorHandlerService.GetUserListById(id);
            return View(m);
        }


    }
}
