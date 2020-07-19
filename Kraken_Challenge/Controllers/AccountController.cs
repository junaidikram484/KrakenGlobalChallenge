using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Kraken_Challenge.Models.HelperClasses;
using Kraken_Challenge.Models.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Serialization;

namespace Kraken_Challenge.Controllers
{
    public class AccountController : Controller
    {
        private IConfiguration _config;
        public AccountController(IConfiguration config)
        {
            _config = config;
        }
        public IActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated && HttpContext.Session.GetString("JWToken") != null)
            {
                return RedirectToAction("Vitals", "Dashboard");
            }
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<Response> LoginAsync(VMLoginApi user)
         {
            try
            {
                using (HttpClient clientc = new HttpClient())
                {
                    var request = new HttpRequestMessage
                    {
                        Method = HttpMethod.Get,
                        RequestUri = new Uri("http://infinitysmartapi-dev.azurewebsites.net/api/auth"),
                        Content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, ContentType.Json),
                    };

                    var response = await clientc.SendAsync(request).ConfigureAwait(false);

                    var responseBody = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        var ds = JsonConvert.DeserializeObject(responseBody);
                        var jobject = (JObject)JsonConvert.DeserializeObject(responseBody);
                        var jvalue = (JValue)jobject["token"];
                        string token = jvalue.Value.ToString();
                        if (token != null)
                        {
                            HttpContext.Session.SetString("JWToken", token);
                            HttpContext.Session.SetString("userEmail", user.username);
                            var claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, user.username),
                            };

                            var claimsIdentity = new ClaimsIdentity(
                                claims, CookieAuthenticationDefaults.AuthenticationScheme);

                            //cookies adjustment
                            CookieOptions option = new CookieOptions();

                            option.Expires = DateTime.Now.AddDays(1);
                            Response.Cookies.Append("userID", Convert.ToString(user.username), option);
                            //cookies adjustment
                            await HttpContext.SignInAsync(
                                CookieAuthenticationDefaults.AuthenticationScheme,
                                new ClaimsPrincipal(claimsIdentity));
                            return new Response()
                            {
                                IsSuccess = true,
                                Message = "Logged in"
                            };
                        }
                        else
                        {
                            return new Response()
                            {
                                IsSuccess = false,
                                Message = "Invalid Credentials"
                            };
                        }
                        
                    }
                    else if(response.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return new Response()
                        {
                            IsSuccess = false,
                            Message = "Invalid Creds"
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
            catch (Exception ex)
            {
                return new Models.HelperClasses.Response()
                {
                    IsSuccess = false,
                    Message = $"Exception Failed {ex}"
                };
                throw;
            }
        }

        public async Task<IActionResult> LogoffAsync()
        {
            await HttpContext.SignOutAsync(
    CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectPermanent("/Account/Login");
        }
        public IActionResult Register()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<Response> RegisterUser([FromForm] VMRegisterUser user)
        {
            using (HttpClient clientc = new HttpClient())
            {
                VMLoginApi userToRegister = new VMLoginApi
                {
                    username = user.Email,
                    password = user.Password
                };
                using (var response = await clientc.PostAsync("http://infinitysmartapi-dev.azurewebsites.net/api/auth", new StringContent(JsonConvert.SerializeObject(userToRegister), Encoding.UTF8, ContentType.Json)))
                {
                    using (var content = response.Content)
                    {
                        var result = await content.ReadAsStringAsync();

                        var responseBody = result;
                        if (response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.Created)
                        {
                            var ds = JsonConvert.DeserializeObject(responseBody);
                            var jobject = (JObject)JsonConvert.DeserializeObject(responseBody);
                            var jvalue = (JValue)jobject["token"];
                            string token = jvalue.Value.ToString();
                            if (token != null)
                            {
                                HttpContext.Session.SetString("JWToken", token);
                                HttpContext.Session.SetString("userEmail", user.Email);
                                var claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, user.Email),
                            };

                                var claimsIdentity = new ClaimsIdentity(
                                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                                //cookies adjustment
                                CookieOptions option = new CookieOptions();

                                option.Expires = DateTime.Now.AddDays(1);
                                Response.Cookies.Append("userID", Convert.ToString(user.Email), option);
                                //cookies adjustment
                                await HttpContext.SignInAsync(
                                    CookieAuthenticationDefaults.AuthenticationScheme,
                                    new ClaimsPrincipal(claimsIdentity));
                                return new Response()
                                {
                                    IsSuccess = true,
                                    Message = "Registered and Logged in"
                                };
                            }
                            else
                            {
                                return new Response()
                                {
                                    IsSuccess = false,
                                    Message = "Not registered"
                                };
                            }

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
    }
}

