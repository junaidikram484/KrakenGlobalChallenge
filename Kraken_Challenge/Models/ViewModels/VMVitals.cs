using Kraken_Challenge.Models.HelperClasses;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kraken_Challenge.Models.ViewModels
{
    public class VMVitals
    {
        public int UserID { get; set; }
        public decimal Tempreture { get; set; }
        public decimal HeartRate { get; set; }
        public string OrganizationId { get; set; }
        public string BusinessUnitId { get; set; }
        public string DeviceId { get; set; }
        public DateTime CreatedDate { get; set; }

        public static async Task<List<VMVitals>> GetUserVitals(string organizationID)
        {
            List<VMVitals> vitals = new List<VMVitals>();
            await Task.Run(() => {
                try
                {
                    using(var db = new krakenDBContext())
                    {
                        vitals = db.Vitals.Where(x => x.OrganizationId == organizationID).Select(x => new VMVitals() { 
                            Tempreture = x.Tempreture,
                            HeartRate = x.HeartRate,
                            OrganizationId = x.OrganizationId,
                            DeviceId = x.DeviceId,
                            BusinessUnitId = x.BusinessUnitId,
                            CreatedDate= Convert.ToDateTime(x.CreatedDate)
                        }).ToList();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            });
            return vitals;
        }
        public static async Task<Response> InsertVitals(VMVitals vitals)
        {
            Response response = new Response();
            await Task.Run(() =>
            {
                try
                {
                    using (var db = new krakenDBContext())
                    {
                        db.Vitals.Add(new Vitals()
                        {
                            Tempreture = vitals.Tempreture,
                            HeartRate = vitals.HeartRate,
                            OrganizationId = vitals.OrganizationId,
                            DeviceId = vitals.DeviceId,
                            BusinessUnitId = vitals.BusinessUnitId
                        });
                        db.SaveChanges();
                        response = new Response()
                        {
                            IsSuccess = true,
                            Message = "Succesfully inserted"
                        };
                    }
                }
                catch (Exception ex)
                {
                    response = new Response()
                    {
                        IsSuccess = false,
                        Message = "Insertion Failed"
                    };
                    throw;
                }
            });
            return response;
        }
    }
}
