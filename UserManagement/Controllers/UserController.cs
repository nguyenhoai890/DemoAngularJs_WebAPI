using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using UserManagement.Models;

namespace UserManagement.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private static int _userId = 1;
        private static List<UserViewModel> userList = new List<UserViewModel>() {
            new UserViewModel(){
                    Id = _userId++,
                    Name = "Hoai",
                    Age = 12,
                    Address = "Hoai home"
                },
                new UserViewModel(){
                    Id = _userId++,
                    Name = "Hoai2",
                    Age = 13,
                    Address = "Hoai home2"
                }
        };
        // GET api/<controller>
        public IEnumerable<UserViewModel> Get()
        {
            return userList;
        }

        public HttpResponseMessage Get(int id)
        {
            var user = userList.Where(x => x.Id == id).FirstOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        // POST api/<controller>
        public HttpResponseMessage Post(UserViewModel user)
        {
            var result = false;
            if (ModelState.IsValid && user.Id != 0)
            {
                var userEntity = userList.Where(x => x.Id == user.Id).FirstOrDefault();
                if (userEntity != null)
                {
                    userEntity.Name = user.Name;
                    userEntity.Address = user.Address;
                    userEntity.Age = user.Age;
                    result = true;
                }
            } 
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put(UserViewModel user)
        {
            bool result = false;
            if (ModelState.IsValid)
            {
                user.Id = _userId++;
                userList.Add(user);
                result = true;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id)
        {
            var result = false;
            if (id != 0)
            {
                var userEntity = userList.Where(x => x.Id == id).FirstOrDefault();
                if (userEntity != null)
                {
                    userList.Remove(userEntity);
                    result = true;
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}