using Kraken_Challenge.Models.HelperClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kraken_Challenge.Models.ViewModels
{
    public class VMRegisterUser
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public async Task<Response> RegisterUser(VMRegisterUser user)
        {
            Response response = null;
            await Task.Run(() =>
            {
                try
                {
                    using (var db = new krakenDBContext())
                    {
                        db.User.Add(new User()
                        {
                            Name = user.Name,
                            Email = user.Email,
                            Password = user.Password,
                            CreatedDate = DateTime.Now.ToString()
                        });
                        db.SaveChanges();
                        response = new Response()
                        {
                            IsSuccess = true,
                            Message = "Operation Succesfull"
                        };
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
