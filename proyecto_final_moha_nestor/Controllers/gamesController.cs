using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyecto_final_moha_nestor.Controllers
{
    public class gamesController : Controller
    {
        //GET: index
        public ActionResult Index()
        {
            return View();
        }


        // GET: g2048
        public ActionResult g2048()
        {
            return View();
        }

        // GET: arcanoid
        public ActionResult arcanoid()
        {
            return View();
        }
    }
}