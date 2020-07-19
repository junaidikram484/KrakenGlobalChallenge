using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kraken_Challenge.Models.HelperClasses;
using Kraken_Challenge.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace Kraken_Challenge.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class UserAccount : ControllerBase
    {
        private IConfiguration _config;
        public UserAccount(IConfiguration config)
        {
            _config = config;
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<Response> RegisterUser([FromForm]VMRegisterUser user)
        {
            VMRegisterUser register = new VMRegisterUser();
            return await register.RegisterUser(user);
        }

        //[HttpPost]
        //[Authorize]
        //public async Task<Response> InsertVitals([FromForm]VMVitals vitals)
        //{
        //    //string userEmail = HttpContext.Session.GetString("userEmail");
        //    //var user = await VMUser.GetUserThroughEmail(userEmail);
        //    //vitals.UserID = (int)user.Id;
        //    //vitals.OrganizationId = _config["InsertionKeys:organizationId"];
        //    //return await VMVitals.InsertVitals(vitals);
        //}

        public bool CallingAjaxFunction()
        {
            System.Threading.Thread.Sleep(7000);
            return true;
        }
    }
}
