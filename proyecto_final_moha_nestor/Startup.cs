using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(proyecto_final_moha_nestor.Startup))]
namespace proyecto_final_moha_nestor
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
