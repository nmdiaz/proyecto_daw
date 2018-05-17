using proyecto_final_moha_nestor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace proyecto_final_moha_nestor.logic
{
    public class DataSaver
    {
        public bool SaveData(recordModel model)
        {
            var conetionString = "Data Source=(LocalDb)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-proyecto_final_moha_nestor-20180515073549.mdf;Initial Catalog=aspnet-proyecto_final_moha_nestor-20180515073549;Integrated Security=True";
            try
            {
                System.Data.SqlClient.SqlConnection sqlConnection1 =
                new System.Data.SqlClient.SqlConnection(conetionString);
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = $"INSERT Records (IdGame, IdUser, RecordTimeStamp, Points) VALUES ({model.idGame}, {model.idUser}, {model.time},{model.score})";
                cmd.Connection = sqlConnection1;

                sqlConnection1.Open();
                cmd.ExecuteNonQuery();
                sqlConnection1.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}