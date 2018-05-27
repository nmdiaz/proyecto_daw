using Microsoft.AspNet.Identity;
using proyecto_final_moha_nestor.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace proyecto_final_moha_nestor.logic
{
	public class get_records
	{
		//Coger las 10 primeras posiciones de los records de un juego determinado
		public static RecordsViewModel[] sacarRecords(string idJuego)
		{
			int contador = 0;
			var conectionString = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-proyecto_final_moha_nestor-20180515073549.mdf;Initial Catalog=aspnet-proyecto_final_moha_nestor-20180515073549;Integrated Security=True";

			System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection(conectionString);
			System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
			cmd.CommandType = System.Data.CommandType.Text;

			cmd.CommandText = $"SELECT UserName, RecordTimeStamp, Points FROM Records, AspNetUsers WHERE IdGame = @idgame AND IdUser = Id ORDER BY Points DESC";
			cmd.Parameters.AddWithValue("@idgame", idJuego);

			cmd.Connection = sqlConnection1;
			sqlConnection1.Open();
			cmd.ExecuteNonQuery();
			SqlDataReader rdr = cmd.ExecuteReader();
			RecordsViewModel puntuaciones;
			RecordsViewModel[] puntuacionesTotales = new RecordsViewModel[10];
			while (rdr.Read() && contador < 10)
			{
				puntuaciones = new RecordsViewModel();
				puntuaciones.Username = (string)rdr["UserName"];
				puntuaciones.time = (string)rdr["RecordTimeStamp"];
				puntuaciones.score = (int.Parse(rdr["Points"].ToString()));
				puntuacionesTotales[contador] = puntuaciones;
				contador++;
			}
			sqlConnection1.Close();

			return puntuacionesTotales;
		}

		//Coger los records de un juego de un usuario en concreto
		public static RecordsViewModel[] sacarRecordsPersonales(string idUsuario, string idJuego)
		{
			int contador = 0;
			var conectionString = @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-proyecto_final_moha_nestor-20180515073549.mdf;Initial Catalog=aspnet-proyecto_final_moha_nestor-20180515073549;Integrated Security=True";
			System.Data.SqlClient.SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection(conectionString);
			System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
			cmd.CommandType = System.Data.CommandType.Text;

			cmd.CommandText = $"SELECT UserName, RecordTimeStamp, Points FROM Records, AspNetUsers WHERE IdGame = @idgame AND IdUser = Id AND IdUser = @idusuario ORDER BY Points DESC";
			cmd.Parameters.AddWithValue("@idgame", idJuego);
			cmd.Parameters.AddWithValue("@idusuario", idUsuario);

			cmd.Connection = sqlConnection1;
			sqlConnection1.Open();
			cmd.ExecuteNonQuery();
			SqlDataReader rdr = cmd.ExecuteReader();
			RecordsViewModel puntuaciones;
			RecordsViewModel[] puntuacionesTotales = new RecordsViewModel[5];
			while (rdr.Read() && contador < 5)
			{
				puntuaciones = new RecordsViewModel();
				puntuaciones.Username = (string)rdr["UserName"];
				puntuaciones.time = (string)rdr["RecordTimeStamp"];
				puntuaciones.score = (int.Parse(rdr["Points"].ToString()));
				puntuacionesTotales[contador] = puntuaciones;
				contador++;
			}
			sqlConnection1.Close();

			return puntuacionesTotales;
		}
	}
}