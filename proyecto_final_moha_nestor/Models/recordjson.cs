using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace proyecto_final_moha_nestor.Models
{
    public class recordjson
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string idGame { get; set; }

        [Required]
        public string time { get; set; }

        [Required]
        public int score { get; set; }
    }

}