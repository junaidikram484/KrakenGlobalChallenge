using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Kraken_Challenge.Models.HelperClasses;
using Kraken_Challenge.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp.Serialization;
using Kraken_Challenge.Filters;

namespace Kraken_Challenge.Controllers
{
    public class DashboardController : Controller
    {
        IConfiguration _config;
        public DashboardController(IConfiguration config)
        {
            _config = config;
        }
        [Authorize]
        public IActionResult Vitals()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
        [ServiceFilter(typeof(CustomAuthorizationFilterAttribute))]
        public async Task<Response> InsertVitals([FromForm] VMVitals vitals)
        {
            using (HttpClient clientc = new HttpClient())
            {
                VMVitalsApi userVitals = new VMVitalsApi
                {
                    organizationId = _config["InsertionKeys:organizationId"],
                    deviceId = vitals.DeviceId,
                    businessUnitId = vitals.BusinessUnitId,
                    heartRate = Convert.ToInt32(vitals.HeartRate),
                    temperature = vitals.Tempreture
                };
                clientc.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                clientc.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("JWToken"));
                using (var response = await clientc.PostAsync("https://infinitysmartapi-dev.azurewebsites.net/api/auth", new StringContent(JsonConvert.SerializeObject(userVitals), Encoding.UTF8, ContentType.Json)))
                {
                    using (var content = response.Content)
                    {
                        var result = await content.ReadAsStringAsync();
                        if (response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.Created)
                        {
                            return new Response()
                            {
                                IsSuccess = true,
                                Message = "Succesfully Inserted"
                            };
                        }
                        if (response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.Created)
                        {
                            return new Response()
                            {
                                IsSuccess = true,
                                Message = "Succesfully Inserted"
                            };
                        }
                        else
                        {
                            return new Response()
                            {
                                IsSuccess = false,
                                Message = "Something went wrong"
                            };
                        }
                    }
                }
            }
        }

        [Authorize]
        public IActionResult ContactUs()
        {
            return View();
        }
        [Authorize]
        [ServiceFilter(typeof(CustomAuthorizationFilterAttribute ))]
        public async Task<IActionResult> DisplayVitalsAsync()
        {
            List<VMVitalsApi> vitals = new List<VMVitalsApi>();

            using (HttpClient clientc = new HttpClient())
            {
                string org_id = _config["InsertionKeys:organizationId"];

                clientc.BaseAddress = new Uri("https://infinitysmartapi-dev.azurewebsites.net/");
                clientc.DefaultRequestHeaders.Clear();
                clientc.DefaultRequestHeaders.AcceptLanguage.Add(new StringWithQualityHeaderValue("nl-NL"));

                clientc.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                string token = HttpContext.Session.GetString("JWToken");
                clientc.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await clientc.GetAsync(string.Format("/api/HumanVitals/{0}", org_id));

                if(response.StatusCode == HttpStatusCode.OK)
                {
                    var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var ds = JsonConvert.DeserializeObject(responseBody);
                    var jobject = (JObject)JObject.Parse(responseBody);
                    var jvalue = jobject["humanVitals"].ToList();
                    foreach (var item in jvalue)
                    {
                        vitals.Add(new VMVitalsApi
                        {
                            organizationId = Convert.ToString(item["organizationId"]),
                            deviceId = Convert.ToString(item["deviceId"]),
                            businessUnitId = Convert.ToString(item["businessUnitId"]),
                            humanVitalId = Convert.ToString(item["humanVitalId"]),
                            eTag = Convert.ToString(item["eTag"]),
                            partitionKey = Convert.ToString(item["partitionKey"]),
                            rowKey = Convert.ToString(item["rowKey"]),
                            timestamp = Convert.ToString(item["timestamp"]),
                            heartRate = Convert.ToInt32(item["heartRate"]),
                            temperature = Convert.ToDecimal(item["temperature"])

                        });

                    }
                }
            }
            return View(vitals);
        }


    }
}
