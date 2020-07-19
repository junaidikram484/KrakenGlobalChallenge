using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kraken_Challenge.Models.ViewModels
{
    public class VMUser
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public long? IsActive { get; set; }
        public string Password { get; set; }

        public static async Task<User> GetUserThroughEmail(string email)
        {
            User user = new User();
            await Task.Run(() => {
                try
                {
                    using(var db = new krakenDBContext())
                    {
                        var selectedUser = db.User.FirstOrDefault(x => x.Email == email);
                        if(selectedUser != null)
                        {
                            user = selectedUser;
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw;
                }
            });
            return user;
        }
    }
}
