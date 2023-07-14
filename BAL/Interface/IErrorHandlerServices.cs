using MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BAL.Interface
{
    public interface IErrorHandlerServices
    {
        List<Organization> getOrganizationList();
        List<Organization> GetOrganizationListById(int id);
        ReturnMessageModel InsertOrganization(Organization productModel);

        ReturnMessageModel UpdateOrganization(Organization productModel);

        ReturnMessageModel DeleteOrganization(int id);

        List<Project> getProjectList();
        ReturnMessageModel DeleteProject(int id);

        ReturnMessageModel InsertProject(Project projectModel);
        List<Project> GetProjectListBy(int id);
        ReturnMessageModel UpdateProject(Project project);


        List<Project> getProjectListByOrganizationId(int id);
        List<Module> getModuleListByProjectId(int oid, int pid);
        List<Module> getModuleList();

        ReturnMessageModel InsertModule(Module moduleModel);
        ReturnMessageModel DeleteModule(int id);
        List<Module> GetModuleListById(int id);
        ReturnMessageModel UpdateModule(Module moduleModel);


        List<User> getUserList();
        List<User> GetUserListById(int id);
        void InserUser(User user);

        void UpdateUser(User user);

        void DeleteUser(int id);

        List<Role> getRoleList();
        List<User> getDeveloperList();

        void SaveIssueError(IssueErrorView modl);
    }
}
