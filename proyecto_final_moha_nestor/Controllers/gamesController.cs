﻿using proyecto_final_moha_nestor.logic;
using proyecto_final_moha_nestor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [HttpGet]
        public ActionResult arcanoid()
        {
            return View();
        }

        // POST: arcanoid
        [HttpPost]
        public  string arcanoid(recordjson recordjs)
        {
            if(!ModelState.IsValid)
            {
                //agregar error de no poderse guardar
                return "{\"status\":\"fail\" }";
            }
            else
            {
                var record = conversor.convertir(recordjs);
                DataSaver.SaveData(record);
                return "{\"status\":\"correct\" }";
            }
            
        }

		// POST: g2048
		[HttpPost]
		public string g2048(recordjson recordjs)
		{
			if (!ModelState.IsValid)
			{
				//agregar error de no poderse guardar
				return "{\"status\":\"fail\" }";
			}
			else
			{
				var record = conversor.convertir(recordjs);
				DataSaver.SaveData(record);
				return "{\"status\":\"correct\" }";
			}

		}
	}
}