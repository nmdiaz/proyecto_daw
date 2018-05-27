using proyecto_final_moha_nestor.logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyecto_final_moha_nestor.Controllers
{
    public class RecordsController : Controller
    {
        // GET: Records
        public ActionResult Index()
        {
            return View();
        }


		//Get: Records/Arcanoid
		public ActionResult Arcanoid()
		{
			var a = get_records.sacarRecords("2");
			ViewData["Records"] = a;  
			return View();
		}

		//Get Records/g2048
		public ActionResult g2048()
		{
			var a = get_records.sacarRecords("1");
			ViewData["Records"] = a;
			return View();
		}

		public ActionResult PersonalRecords()
		{
			return View();
		}
	}


	


}