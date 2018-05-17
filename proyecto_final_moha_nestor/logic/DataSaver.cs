using proyecto_final_moha_nestor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace proyecto_final_moha_nestor.logic
{
    public class DataSaver
    {
        public static bool SaveData(recordModel model)
        {
            var conectionString = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-proyecto_final_moha_nestor-20180515073549.mdf;Initial Catalog=aspnet-proyecto_final_moha_nestor-20180515073549;Integrated Security=True";
            
                System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection(conectionString);
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;

                cmd.CommandText = $"INSERT INTO Records (IdGame, IdUser, RecordTimeStamp, Points) VALUES (@idjuego, @idusuario, @tiempo, @puntos)";
                cmd.Parameters.AddWithValue("@idjuego", model.idGame);
            cmd.Parameters.AddWithValue("@idusuario", model.idUser);
            cmd.Parameters.AddWithValue("@tiempo", model.time);
            cmd.Parameters.AddWithValue("@puntos", model.score);

            cmd.Connection = sqlConnection1;
                sqlConnection1.Open();
                var error = cmd.ExecuteNonQuery();
                sqlConnection1.Close();
                return true;


  
        }

    }
}