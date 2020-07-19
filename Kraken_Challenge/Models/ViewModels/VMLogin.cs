using Kraken_Challenge.Models.HelperClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kraken_Challenge.Models.ViewModels
{
    public class VMLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public async Task<Response> ValidateUserCredentials(VMLogin user)
        {
            Response response = null;
            await Task.Run(() =>
            {
                try
                {
                    using(var db = new krakenDBContext())
                    {
                        var result = db.User.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
                        if(result != null)
                        {
                            response = new Response()
                            {
                                IsSuccess = true,
                                Message = $"Succesfully Logged In"
                            };
                        }
                        else
                        {
                            response = new Response()
                            {
                                IsSuccess = false,
                                Message = $"Invalid Username/Email or Password"
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    response = new Response()
                    {
                        IsSuccess = false,
                        Message = $"Exception occured {ex}"
                    };
                    throw;
                }
            });
            return response;
        }
    }
}
