using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound(){
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest(){
            return BadRequest(new ProblemDetails{Title="This is a bad request"});
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorized(){
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError(){
            ModelState.AddModelError("Problem1", "this is 1 error");
            ModelState.AddModelError("Problem2", "this is 2 error");
            ModelState.AddModelError("Problem3", "this is 3 error");
            return ValidationProblem();
        } 
        [HttpGet("server-error")]
        public ActionResult GetServerError(){
            throw new Exception("This is a Server Error");
        }

 
    }
} 