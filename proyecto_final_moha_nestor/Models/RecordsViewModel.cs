using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace proyecto_final_moha_nestor.Models
{
	public class RecordsViewModel
	{
		[Required]
		public string Username { get; set; }

		[Required]
		public string time { get; set; }

		[Required]
		public int score { get; set; }

	}
}