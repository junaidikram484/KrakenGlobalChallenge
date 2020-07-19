using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;


namespace Kraken_Challenge.Filters
{
    public class CustomAuthorizationFilterAttribute : IActionFilter
    {
        void IActionFilter.OnActionExecuted(ActionExecutedContext context)
        {
        }

        void IActionFilter.OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.Session.GetString("JWToken") == null)
            {
                context.Result =
                           new RedirectToRouteResult(
                               new RouteValueDictionary{{ "controller", "Account" },
                                              { "action", "Login" }

                                                                 });
            }
        }
    }
}
