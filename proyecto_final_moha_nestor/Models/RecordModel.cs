using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace proyecto_final_moha_nestor.Models
{
    public class recordModel
    {
        [Required]
        public string idUser { get; set; }

        [Required]
        public string idGame { get; set; }

        [Required]
        public TimestampAttribute time { get; set; } 

        [Required]
        public int score { get; set; }
    }

}