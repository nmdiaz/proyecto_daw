using System.Web;
using System.Web.Mvc;

namespace proyecto_final_moha_nestor
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
