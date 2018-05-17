using Microsoft.AspNet.Identity;
using proyecto_final_moha_nestor.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace proyecto_final_moha_nestor.logic
{
    public class conversor
    {
        public static recordModel convertir(recordjson modeljs)
        {
            var conectionString = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-proyecto_final_moha_nestor-20180515073549.mdf;Initial Catalog=aspnet-proyecto_final_moha_nestor-20180515073549;Integrated Security=True";

            System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection(conectionString);
            System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"SELECT Id FROM AspNetUsers WHERE UserName = @iduser";
            cmd.Parameters.AddWithValue("@iduser", modeljs.UserName);

            cmd.Connection = sqlConnection1;
            sqlConnection1.Open();
            cmd.ExecuteNonQuery();
            SqlDataReader rdr = cmd.ExecuteReader();
            string userid ="";
            while (rdr.Read())
            {
                userid = (string)rdr["Id"];
            }

            sqlConnection1.Close();

            var modelrecord = new recordModel();
            modelrecord.idGame = modeljs.idGame;
            modelrecord.idUser = userid;
            modelrecord.time = modeljs.time;
            modelrecord.score = modeljs.score;




            return modelrecord;

        }
    }
}