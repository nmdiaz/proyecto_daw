using Microsoft.AspNet.Identity;
using proyecto_final_moha_nestor.logic;
using proyecto_final_moha_nestor.Models;
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
			var records = get_records.sacarRecords("2");
			ViewData["Records"] = records;  
			return View();
		}

		//Get Records/g2048
		public ActionResult g2048()
		{
			var records = get_records.sacarRecords("1");
			ViewData["Records"] = records;
			return View();
		}

		//Get Records/PersonalRecords
		public ActionResult PersonalRecords()
		{
			var idusuario = User.Identity.GetUserId();
			RecordsViewModel[][] records = new RecordsViewModel[2][]; 
			records[0] = get_records.sacarRecordsPersonales(idusuario, "1");
			records[1] = get_records.sacarRecordsPersonales(idusuario, "2");
			ViewData["Records"] = records;
			return View();
		}
	}


	


}